// @ts-expect-error -- add `"type": "module"` to `package.json` to fix this
import { RuleTester } from '@theguild/eslint-rule-tester';
import { ParserOptions } from '../src/index.js';

export const DEFAULT_CONFIG = {
  parser: require.resolve('@graphql-eslint/eslint-plugin'),
  parserOptions: {
    graphQLConfig: {},
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
