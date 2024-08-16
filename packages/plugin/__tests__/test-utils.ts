import { Linter } from 'eslint';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { ParserOptions } from '../src/index.js';

export const DEFAULT_CONFIG: Linter.Config = {
  languageOptions: {
    parser: graphqlPlugin.parser,
  },
};

export type ParserOptionsForTests = {
  graphQLConfig: Partial<ParserOptions['graphQLConfig']>;
};

export const ruleTester = new RuleTester<ParserOptionsForTests>(DEFAULT_CONFIG);

export function withSchema<T extends { code: string }>({ code, ...rest }: T) {
  return {
    code,
    parserOptions: {
      graphQLConfig: {
        schema: code,
      },
    } satisfies ParserOptionsForTests,
    ...rest,
  };
}
