import { join } from 'path';
import { GraphQLRuleTester } from '../src';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const TEST_SCHEMA = /* GraphQL */ `
  type User {
    id: ID!
    firstName: String!
  }

  type Query {
    user: User
  }
`;

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('known-fragment-names', GRAPHQL_JS_VALIDATIONS['known-fragment-names'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/user.graphql'),
      code: ruleTester.fromMockFile('user.graphql'),
      parserOptions: {
        schema: TEST_SCHEMA,
      },
    },
  ],
  invalid: [],
});
