import { ParserOptions } from '../src';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { rule } from '../src/rules/no-scalar-result-type-on-mutation';

const useSchema = (
  code: string,
): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } => ({
  code,
  parserOptions: {
    schema: /* GraphQL */ `
      type User {
        id: ID!
      }

      ${code}
    `,
  },
});

const ruleTester = new RuleTester();

ruleTester.run('no-scalar-result-type-on-mutation', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        good: Boolean
      }
    `),
    useSchema(/* GraphQL */ `
      type Mutation {
        createUser: User!
      }
    `),
    useSchema(/* GraphQL */ `
      type RootMutation {
        createUser: User!
      }

      schema {
        mutation: RootMutation
      }
    `),
  ],
  invalid: [
    {
      name: 'should ignore arguments',
      ...useSchema(/* GraphQL */ `
        type Mutation {
          createUser(a: ID, b: ID!, c: [ID]!, d: [ID!]!): Boolean
        }
      `),
      errors: 1,
    },
    {
      ...useSchema(/* GraphQL */ `
        type Mutation

        extend type Mutation {
          createUser: Boolean!
        }
      `),
      errors: 1,
    },
    {
      ...useSchema(/* GraphQL */ `
        type RootMutation {
          createUser: [Boolean]
        }

        schema {
          mutation: RootMutation
        }
      `),
      errors: 1,
    },
    {
      ...useSchema(/* GraphQL */ `
        type RootMutation
        extend type RootMutation {
          createUser: [Boolean]!
        }

        schema {
          mutation: RootMutation
        }
      `),
      errors: 1,
    },
    {
      ...useSchema(/* GraphQL */ `
        type Mutation {
          createUser: User!
          updateUser: Int
          deleteUser: [Boolean!]!
        }
      `),
      errors: 2,
    },
  ],
});
