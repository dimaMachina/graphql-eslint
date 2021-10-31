import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/avoid-scalar-result-type-on-mutation';

const useSchema = (code: string): { code: string; parserOptions: ParserOptions } => ({
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

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('avoid-scalar-result-type-on-mutation', rule, {
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
      ...useSchema(/* GraphQL */ `
        type Mutation {
          createUser: Boolean
        }
      `),
      errors: [{ message: 'Unexpected scalar result type "Boolean"' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Mutation

        extend type Mutation {
          createUser: Boolean!
        }
      `),
      errors: [{ message: 'Unexpected scalar result type "Boolean"' }],
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
      errors: [{ message: 'Unexpected scalar result type "Boolean"' }],
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
      errors: [{ message: 'Unexpected scalar result type "Boolean"' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Mutation {
          createUser: User!
          updateUser: Int
          deleteUser: [Boolean!]!
        }
      `),
      errors: [
        { message: 'Unexpected scalar result type "Int"' },
        { message: 'Unexpected scalar result type "Boolean"' },
      ],
    },
  ],
});
