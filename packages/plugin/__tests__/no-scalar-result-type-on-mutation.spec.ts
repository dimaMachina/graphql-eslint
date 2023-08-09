import { rule } from '../src/rules/no-scalar-result-type-on-mutation';
import { ParserOptionsForTests, ruleTester } from './test-utils';

const useSchema = (code: string) => ({
  code,
  parserOptions: {
    graphQLConfig: {
      schema: /* GraphQL */ `
        type User {
          id: ID!
        }

        ${code}
      `,
    },
  } satisfies ParserOptionsForTests,
});

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
