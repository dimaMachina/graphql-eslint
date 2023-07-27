import { join } from 'node:path';
import { ParserOptions, rules } from '../src';
import { RuleTester } from '../src/testkit';

const ruleTester = new RuleTester();

const useUserSchema = (
  code: string,
): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } => {
  return {
    code,
    parserOptions: {
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

ruleTester.run('possible-type-extension', rules['possible-type-extension'], {
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
