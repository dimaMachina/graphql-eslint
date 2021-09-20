import { GraphQLRuleTester } from '../src/testkit';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('possible-type-extension', GRAPHQL_JS_VALIDATIONS['possible-type-extension'], {
  valid: [
    /* GraphQL */ `
      type User {
        id: ID!
      }

      extend type User {
        name: String!
      }
    `,
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        type User {
          id: ID!
        }

        extend type OtherUser {
          name: String!
        }
      `,
      errors: [{ message: 'Cannot extend type "OtherUser" because it is not defined.' }],
    },
  ],
});
