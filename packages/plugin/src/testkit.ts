import { readFileSync } from 'fs';
import { resolve } from 'path';
import { RuleTester, AST, Linter, Rule } from 'eslint';
import { ASTKindToNode } from 'graphql';
import { codeFrameColumns } from '@babel/code-frame';
import { GraphQLESTreeNode } from './estree-parser';
import { GraphQLESLintRule, ParserOptions } from './types';

export type GraphQLESLintRuleListener<WithTypeInfo extends boolean = false> = {
  [K in keyof ASTKindToNode]?: (node: GraphQLESTreeNode<ASTKindToNode[K], WithTypeInfo>) => void;
} & Record<string, any>;

export type GraphQLValidTestCase<Options> = Omit<RuleTester.ValidTestCase, 'options' | 'parserOptions'> & {
  name?: string;
  options?: Options;
  parserOptions?: ParserOptions;
};

export type GraphQLInvalidTestCase<T> = GraphQLValidTestCase<T> & {
  errors: number | Array<RuleTester.TestCaseError | string>;
  output?: string | null;
};

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

  runGraphQLTests<Config>(
    name: string,
    rule: GraphQLESLintRule,
    tests: {
      valid: (string | GraphQLValidTestCase<Config>)[];
      invalid: GraphQLInvalidTestCase<Config>[];
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

    super.run(name, rule as Rule.RuleModule, ruleTests);

    // Skip snapshot testing if `expect` variable is not defined
    if (typeof expect === 'undefined') {
      return;
    }

    const linter = new Linter();
    linter.defineRule(name, rule as Rule.RuleModule);

    for (const testCase of tests.invalid) {
      const verifyConfig = getVerifyConfig(name, this.config, testCase);
      defineParser(linter, verifyConfig.parser);

      const { code, filename } = testCase;

      const messages = linter.verify(code, verifyConfig, { filename });

      for (const message of messages) {
        if (message.fatal) {
          throw new Error(message.message);
        }

        const messageForSnapshot = visualizeEslintMessage(code, message);
        // eslint-disable-next-line no-undef
        expect(messageForSnapshot).toMatchSnapshot();
      }
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
