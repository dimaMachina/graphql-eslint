import { RuleTester } from '@theguild/eslint-rule-tester';
import { ParserOptions } from '../src/types.js';

export const DEFAULT_CONFIG = {
  parser: require.resolve('@graphql-eslint/eslint-plugin'),
};

export const ruleTester = new RuleTester<Partial<ParserOptions>>(DEFAULT_CONFIG);

export function withSchema<T extends { code: string }>({ code, ...rest }: T) {
  return {
    code,
    parserOptions: {
      graphQLConfig: {
        schema: code,
      },
    } satisfies Partial<ParserOptions>,
    ...rest,
  };
}
