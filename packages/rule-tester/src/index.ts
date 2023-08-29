import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AST, RuleTester as ESLintRuleTester, Linter, Rule } from 'eslint';
import { codeFrameColumns } from '@babel/code-frame';
import { GraphQLESLintRule } from '../../plugin/src/types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

type ValidTestCase<Options = [], ParserOptions = Record<string, never>> = Omit<
  ESLintRuleTester.ValidTestCase,
  'options' | 'parserOptions'
> & {
  options?: Options;
  parserOptions?: ParserOptions;
};

function indentCode(code: string, indent = 4): string {
  return code.replace(/^/gm, ' '.repeat(indent));
}

// A simple version of `SourceCodeFixer.applyFixes`
// https://github.com/eslint/eslint/issues/14936#issuecomment-906746754
function applyFix(code: string, { range, text }: Rule.Fix): string {
  return [code.slice(0, range[0]), text, code.slice(range[1])].join('');
}

export class RuleTester<ParserOptions> extends ESLintRuleTester {
  fromMockFile(path: string): string {
    return readFileSync(resolve(__dirname, `../../plugin/__tests__/mocks/${path}`), 'utf-8');
  }

  // @ts-expect-error -- fix later
  run<Options, WithTypeInfo extends boolean = false>(
    ruleId: string,
    rule: GraphQLESLintRule<Options, WithTypeInfo>,
    tests: {
      valid: (string | ValidTestCase<Options, ParserOptions>)[];
      invalid: (ValidTestCase<Options, ParserOptions> &
        Pick<ESLintRuleTester.InvalidTestCase, 'errors'>)[];
    },
  ): void {
    // @ts-expect-error -- fix later
    const { testerConfig, linter } = this;

    const getMessages = (
      testCase: ESLintRuleTester.InvalidTestCase,
      messages: Linter.LintMessage[],
    ) => {
      const { options, code, filename, parserOptions } = testCase;

      const config = {
        parser: testerConfig.parser,
        parserOptions: {
          ...testerConfig.parserOptions,
          ...parserOptions,
        },
        rules: {
          [ruleId]: Array.isArray(options) ? ['error', ...options] : 'error',
        },
      };
      const codeFrame = indentCode(printCode(code, { line: 0, column: 0 }));
      const messageForSnapshot = ['#### ⌨️ Code', codeFrame];

      if (options) {
        const opts = JSON.stringify(options, null, 2).slice(1, -1);
        messageForSnapshot.push('#### ⚙️ Options', indentCode(removeTrailingBlankLines(opts), 2));
      }
      for (const [index, message] of messages.entries()) {
        const codeWithMessage = printCode(code, message, 1);
        messageForSnapshot.push(
          printWithIndex('#### ❌ Error', index, messages.length),
          indentCode(codeWithMessage),
        );

        // Don't print suggestions in snapshots for too big codes
        if (message.suggestions && (code.match(/\n/g) || '').length < 1000) {
          for (const [i, suggestion] of message.suggestions.entries()) {
            const title = printWithIndex(
              '#### 💡 Suggestion',
              i,
              message.suggestions.length,
              suggestion.desc,
            );
            const output = applyFix(code, suggestion.fix);
            const codeFrame = printCode(output, { line: 0, column: 0 });
            messageForSnapshot.push(title, indentCode(codeFrame, 2));
          }
        }
      }
      if (rule.meta.fixable) {
        const { fixed, output } = linter.verifyAndFix(code, config, filename);
        if (fixed) {
          messageForSnapshot.push('#### 🔧 Autofix output', indentCode(printCode(output)));
        }
      }
      expect(messageForSnapshot.join('\n\n')).toMatchSnapshot();
    };

    for (const [id, testCase] of tests.invalid.entries()) {
      testCase.name ||= `Invalid #${id + 1}`;
      testCase.code = removeTrailingBlankLines(testCase.code);
      Object.defineProperty(testCase, 'assertMessages', {
        value: getMessages,
      });
    }

    // @ts-expect-error -- fix later
    super.run(ruleId, rule as any, tests);
  }
}

function removeTrailingBlankLines(text: string): string {
  return text.replace(/^\s*\n/, '').trimEnd();
}

function printWithIndex(title: string, index: number, total: number, description?: string): string {
  if (total > 1) {
    title += ` ${index + 1}/${total}`;
  }
  if (description) {
    title += `: ${description}`;
  }
  return title;
}

function printCode(
  code: string,
  result: Partial<Linter.LintMessage> = {},
  linesOffset = Number.POSITIVE_INFINITY,
): string {
  const { line, column, endLine, endColumn, message } = result;
  const location = {} as AST.SourceLocation;

  if (typeof line === 'number' && typeof column === 'number') {
    location.start = {
      line,
      column,
    };
  }

  if (typeof endLine === 'number' && typeof endColumn === 'number') {
    location.end = {
      line: endLine,
      column: endColumn,
    };
  }

  return codeFrameColumns(code, location, {
    linesAbove: linesOffset,
    linesBelow: linesOffset,
    message,
  });
}
