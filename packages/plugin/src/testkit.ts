import { readFileSync } from 'fs';
import { resolve } from 'path';
import { RuleTester, AST, Linter } from 'eslint';
import { ASTKindToNode } from 'graphql';
import { codeFrameColumns } from '@babel/code-frame';
import { GraphQLESTreeNode } from './estree-parser';
import { GraphQLESLintRule, ParserOptions } from './types';

export type GraphQLESLintRuleListener<WithTypeInfo extends boolean = false> = {
  [K in keyof ASTKindToNode]?: (node: GraphQLESTreeNode<ASTKindToNode[K], WithTypeInfo>) => void;
} & Record<string, any>;

export type GraphQLValidTestCase<Options> = Omit<RuleTester.ValidTestCase, 'options' | 'parserOptions'> & {
  options?: Options;
  parserOptions?: ParserOptions;
};

export type GraphQLInvalidTestCase<T> = GraphQLValidTestCase<T> & {
  errors: number | Array<RuleTester.TestCaseError | string>;
  output?: string | null;
};

function indentCode(code: string, indent = 4): string {
  return code.replace(/^/gm, ' '.repeat(indent));
}

function printCode(code: string): string {
  return codeFrameColumns(
    code,
    { start: { line: 0, column: 0 } },
    {
      linesAbove: Number.POSITIVE_INFINITY,
      linesBelow: Number.POSITIVE_INFINITY,
    }
  );
}

export class GraphQLRuleTester extends RuleTester {
  config: {
    parser: string;
    parserOptions: ParserOptions;
  };

  constructor(parserOptions: ParserOptions = {}) {
    const config = {
      parser: require.resolve('@graphql-eslint/eslint-plugin'),
      parserOptions: {
        ...parserOptions,
        skipGraphQLConfig: true,
      },
    };
    super(config);
    this.config = config;
  }

  fromMockFile(path: string): string {
    return readFileSync(resolve(__dirname, `../tests/mocks/${path}`), 'utf-8');
  }

  runGraphQLTests<Options, WithTypeInfo extends boolean = false>(
    name: string,
    rule: GraphQLESLintRule<Options, WithTypeInfo>,
    tests: {
      valid: (string | GraphQLValidTestCase<Options>)[];
      invalid: GraphQLInvalidTestCase<Options>[];
    }
  ): void {
    const ruleTests = Linter.version.startsWith('8')
      ? tests
      : {
          valid: tests.valid.map(test => {
            if (typeof test === 'string') {
              return test;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { name, ...testCaseOptions } = test;
            return testCaseOptions;
          }),
          invalid: tests.invalid.map(test => {
            // ESLint 7 throws an error on CI - Unexpected top-level property "name"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { name, ...testCaseOptions } = test;
            return testCaseOptions;
          }),
        };

    super.run(name, rule as any, ruleTests);

    // Skip snapshot testing if `expect` variable is not defined
    if (typeof expect === 'undefined') {
      return;
    }

    const linter = new Linter();
    linter.defineRule(name, rule as any);

    const hasOnlyTest = tests.invalid.some(t => t.only);

    for (const testCase of tests.invalid) {
      const { only, code, filename } = testCase;
      if (hasOnlyTest && !only) {
        continue;
      }

      const verifyConfig = getVerifyConfig(name, this.config, testCase);
      defineParser(linter, verifyConfig.parser);

      const messages = linter.verify(code, verifyConfig, { filename });
      const messageForSnapshot: string[] = [];
      for (const [index, message] of messages.entries()) {
        if (message.fatal) {
          throw new Error(message.message);
        }

        messageForSnapshot.push(`❌ Error ${index + 1}/${messages.length}`, visualizeEslintMessage(code, message));

      }
      if (rule.meta.fixable) {
        const { fixed, output } = linter.verifyAndFix(code, verifyConfig, { filename });
        if (fixed) {
          messageForSnapshot.push('🔧 Autofix output', indentCode(printCode(output), 2));
        }
      }
      expect(messageForSnapshot.join('\n\n')).toMatchSnapshot();
    }
  }
}

function getVerifyConfig(ruleId: string, testerConfig, testCase) {
  const { options, parserOptions, parser = testerConfig.parser } = testCase;

  return {
    ...testerConfig,
    parser,
    parserOptions: {
      ...testerConfig.parserOptions,
      ...parserOptions,
    },
    rules: {
      [ruleId]: ['error', ...(Array.isArray(options) ? options : [])],
    },
  };
}

const parsers = new WeakMap();

function defineParser(linter: Linter, parser: string): void {
  if (!parser) {
    return;
  }
  if (!parsers.has(linter)) {
    parsers.set(linter, new Set());
  }

  const defined = parsers.get(linter);
  if (!defined.has(parser)) {
    defined.add(parser);
    linter.defineParser(parser, require(parser));
  }
}

function visualizeEslintMessage(text: string, result: Linter.LintMessage): string {
  const { line, column, endLine, endColumn, message } = result;
  const location: Partial<AST.SourceLocation> = {
    start: {
      line,
      column,
    },
  };

  if (typeof endLine === 'number' && typeof endColumn === 'number') {
    location.end = {
      line: endLine,
      column: endColumn,
    };
  }

  return codeFrameColumns(text, location as AST.SourceLocation, {
    linesAbove: Number.POSITIVE_INFINITY,
    linesBelow: Number.POSITIVE_INFINITY,
    message,
  });
}
