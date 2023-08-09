import { rule } from '../src/rules/require-field-of-type-query-in-mutation-result';
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

ruleTester.run('require-field-of-type-query-in-mutation-result', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        user: User
      }
    `),
    useSchema(/* GraphQL */ `
      # type Query is not defined and no error is reported
      type Mutation {
        createUser: User!
      }
    `),
    useSchema(/* GraphQL */ `
      type Query
      type CreateUserPayload {
        user: User!
        query: Query!
      }

      type Mutation {
        createUser: CreateUserPayload!
      }
    `),
    useSchema(/* GraphQL */ `
      # No errors are reported for type union, interface and scalar
      type Admin {
        id: ID!
      }
      union Union = User | Admin

      interface Interface {
        id: ID!
      }

      type Query
      type Mutation {
        foo: Boolean
        bar: Union
        baz: Interface
      }
    `),
  ],
  invalid: [
    {
      name: 'should ignore arguments',
      ...useSchema(/* GraphQL */ `
        type Query
        type Mutation {
          createUser(a: User, b: User!, c: [User], d: [User]!, e: [User!]!): User
        }
      `),
      errors: [{ message: 'Mutation result type "User" must contain field of type "Query"' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query
        type Mutation

        extend type Mutation {
          createUser: User!
        }
      `),
      errors: [{ message: 'Mutation result type "User" must contain field of type "Query"' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type RootQuery
        type RootMutation {
          createUser: [User]
        }

        schema {
          mutation: RootMutation
          query: RootQuery
        }
      `),
      errors: [{ message: 'Mutation result type "User" must contain field of type "RootQuery"' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type RootQuery
        type RootMutation
        extend type RootMutation {
          createUser: [User!]!
        }

        schema {
          mutation: RootMutation
          query: RootQuery
        }
      `),
      errors: [{ message: 'Mutation result type "User" must contain field of type "RootQuery"' }],
    },
  ],
});
