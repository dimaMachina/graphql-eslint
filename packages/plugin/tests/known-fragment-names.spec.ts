import { join } from 'path';
import { GraphQLRuleTester, rules } from '../src';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('known-fragment-names', rules['known-fragment-names'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/user.graphql'),
      code: ruleTester.fromMockFile('user.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
      },
    },
  ],
  invalid: [],
});
