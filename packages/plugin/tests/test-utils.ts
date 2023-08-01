import { RuleTester } from '@theguild/eslint-rule-tester';

export const DEFAULT_CONFIG = {
  parser: require.resolve('@graphql-eslint/eslint-plugin'),
  parserOptions: {
    skipGraphQLConfig: true,
  },
};

export const ruleTester = new RuleTester(DEFAULT_CONFIG);
