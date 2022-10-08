import { join } from 'path';
import { GraphQLRuleTester, rules, ParserOptions } from '../src';

const ruleTester = new GraphQLRuleTester();

const useUserSchema = (code: string) => {
  return {
    code,
    parserOptions: <ParserOptions>{
      schema: /* GraphQL */ `
        type User {
          id: ID
        }

        type Query {
          user: User
        }
      `,
    },
  };
};

ruleTester.runGraphQLTests('possible-type-extension', rules['possible-type-extension'], {
  valid: [
    useUserSchema(/* GraphQL */ `
      extend type User {
        name: String
      }
    `),
    {
      name: 'when schema is separate into graphql files',
      filename: join(
        __dirname,
        'mocks/possible-type-extension/separate-graphql-files/type-user.gql',
      ),
      code: ruleTester.fromMockFile('possible-type-extension/separate-graphql-files/type-user.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/possible-type-extension/separate-graphql-files/*.gql'),
      },
    },
    {
      name: 'when schema is separate into code files',
      filename: join(__dirname, 'mocks/possible-type-extension/separate-code-files/type-user.ts'),
      code: /* GraphQL */ `
        type User {
          id: ID!
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
      ...useUserSchema(/* GraphQL */ `
        extend type OtherUser {
          name: String
        }
      `),
      errors: [{ message: 'Cannot extend type "OtherUser" because it is not defined.' }],
    },
  ],
});
