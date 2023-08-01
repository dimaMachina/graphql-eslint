import { RuleTester } from '@theguild/eslint-rule-tester';

export const ruleTester = new RuleTester({
  parser: require.resolve('@graphql-eslint/eslint-plugin'),
  parserOptions: {
    skipGraphQLConfig: true,
  },
});
