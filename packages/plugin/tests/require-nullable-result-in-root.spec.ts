import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule } from '../src/rules/require-nullable-result-in-root';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: Omit<ParserOptions, 'filePath'> } {
  return {
    code,
    parserOptions: { schema: code },
  };
}

ruleTester.runGraphQLTests('require-nullable-result-in-root', rule, {
  valid: [
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          foo: User
          baz: [User]!
          bar: [User!]!
        }
        type User {
          id: ID!
        }
      `),
    },
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          user: User!
        }
        type User {
          id: ID!
        }
      `),
      errors: 1,
    },
    {
      name: 'should work with extend query',
      ...useSchema(/* GraphQL */ `
        type MyMutation
        extend type MyMutation {
          user: User!
        }
        interface User {
          id: ID!
        }
        schema {
          mutation: MyMutation
        }
      `),
      errors: 1,
    },
  ],
});
