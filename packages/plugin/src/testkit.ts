import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import { ASTKindToNode } from 'graphql';
import { resolve } from 'path';
import { GraphQLESTreeNode } from './estree-parser';
import { GraphQLESLintRule, ParserOptions } from './types';

export type GraphQLESLintRuleListener<WithTypeInfo extends boolean> = {
  [K in keyof ASTKindToNode]?: (node: GraphQLESTreeNode<ASTKindToNode[K], WithTypeInfo>) => void;
} &
  Record<string, any>;

export type GraphQLValidTestCase<Options> = Omit<RuleTester.ValidTestCase, 'options' | 'parserOptions'> & {
  options?: Options;
  parserOptions?: ParserOptions;
};

export type GraphQLInvalidTestCase<T> = GraphQLValidTestCase<T> & {
  errors: number | Array<RuleTester.TestCaseError | string>;
  output?: string | null;
};

export class GraphQLRuleTester extends require('eslint').RuleTester {
  constructor(parserOptions?: ParserOptions) {
    super({
      parser: require.resolve('@graphql-eslint/eslint-plugin'),
      parserOptions: {
        ...parserOptions,
        skipGraphQLConfig: true,
      },
    });
  }

  fromMockFile(path: string): string {
    return readFileSync(resolve(__dirname, `../tests/mocks/${path}`), 'utf-8');
  }

  runGraphQLTests<Config>(
    name: string,
    rule: GraphQLESLintRule,
    tests: {
      valid: GraphQLValidTestCase<Config>[];
      invalid: GraphQLInvalidTestCase<Config>[];
    }
  ): void {
    super.run(name, rule, tests);
  }
}
