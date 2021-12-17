import { join } from 'path';
import { GraphQLRuleTester, rules } from '../src';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('possible-type-extension', rules['possible-type-extension'], {
  valid: [
    /* GraphQL */ `
      type User {
        id: ID!
      }

      extend type User {
        name: String!
      }
    `,
    {
      name: 'when schema is separate into graphql files',
      filename: join(__dirname, 'mocks/possible-type-extension/separate-graphql-files/extend-type-user.gql'),
      code: ruleTester.fromMockFile('possible-type-extension/separate-graphql-files/extend-type-user.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/possible-type-extension/separate-graphql-files/*.gql'),
      },
    },
    {
      name: 'when schema is separate into code files',
      filename: join(__dirname, 'mocks/possible-type-extension/separate-code-files/extend-type-user.ts'),
      code: /* GraphQL */ `
        extend type User {
          firstName: String
        }
      `,
      parserOptions: {
        schema: join(__dirname, 'mocks/possible-type-extension/separate-code-files/*.ts'),
      },
    },
    {
      name: 'when schema exist in one file',
      filename: join(__dirname, 'mocks/possible-type-extension/one-graphql-file/type-user.gql'),
      code: ruleTester.fromMockFile('possible-type-extension/one-graphql-file/type-user.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/possible-type-extension/one-graphql-file/type-user.gql'),
      },
    },
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
