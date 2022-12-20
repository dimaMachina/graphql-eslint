import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule, StrictIdInTypesRuleConfig } from '../src/rules/strict-id-in-types';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: Pick<ParserOptions, 'schema'> } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests<[StrictIdInTypesRuleConfig]>('strict-id-in-types', rule, {
  valid: [
    useSchema('type A { id: ID! }'),
    {
      ...useSchema('type A { _id: String! }'),
      options: [
        {
          acceptedIdNames: ['_id'],
          acceptedIdTypes: ['String'],
        },
      ],
    },
    {
      ...useSchema('type A { _id: String! } type A1 { id: ID! }'),
      options: [
        {
          acceptedIdNames: ['id', '_id'],
          acceptedIdTypes: ['ID', 'String'],
        },
      ],
    },
    {
      ...useSchema('type A { id: ID! } type AResult { key: String! }'),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: ['Result'],
          },
        },
      ],
    },
    {
      ...useSchema('type A { id: ID! } type A1 { id: ID! }'),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: [''],
          },
        },
      ],
    },
    {
      ...useSchema('type A { id: ID! } type A1 { id: ID! }'),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
        },
      ],
    },
    {
      ...useSchema(
        'type A { id: ID! } type AResult { key: String! } type APayload { bool: Boolean! } type APagination { num: Int! }',
      ),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: ['Result', 'Payload', 'Pagination'],
          },
        },
      ],
    },
    {
      ...useSchema('type A { id: ID! } type AError { message: String! }'),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: ['AError'],
          },
        },
      ],
    },
    {
      ...useSchema(
        'type A { id: ID! } type AGeneralError { message: String! } type AForbiddenError { message: String! }',
      ),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: ['AGeneralError', 'AForbiddenError'],
          },
        },
      ],
    },
    {
      ...useSchema('type A { id: ID! }'),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: [''],
          },
        },
      ],
    },
    {
      ...useSchema(
        'type A { id: ID! } type AError { message: String! } type AResult { payload: A! }',
      ),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: ['AError'],
            suffixes: ['Result'],
          },
        },
      ],
    },
    {
      name: 'should ignore root types',
      ...useSchema(/* GraphQL */ `
        type User {
          id: ID!
        }
        type Query {
          user: User
        }
        type Mutation {
          createUser: User
        }
        type Subscription {
          userAdded: User
        }
      `),
    },
    {
      name: 'should ignore root types that are renamed',
      ...useSchema(/* GraphQL */ `
        type User {
          id: ID!
        }
        type MyQuery {
          user: User
        }
        type MyMutation {
          createUser: User
        }
        type MySubscription {
          userAdded: User
        }
        schema {
          query: MyQuery
          mutation: MyMutation
          subscription: MySubscription
        }
      `),
    },
  ],
  invalid: [
    {
      ...useSchema('type B { name: String! }'),
      errors: 1,
    },
    {
      ...useSchema('type B { id: ID! _id: String! }'),
      options: [
        {
          acceptedIdNames: ['id', '_id'],
          acceptedIdTypes: ['ID', 'String'],
        },
      ],
      errors: 1,
    },
    {
      ...useSchema(
        'type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }',
      ),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['String'],
        },
      ],
      errors: 4,
    },
    {
      ...useSchema(
        'type B { id: ID! } type Bresult { key: String! } type BPayload { bool: Boolean! } type BPagination { num: Int! }',
      ),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: ['Result', 'Payload'],
          },
        },
      ],
      errors: 2,
    },
    {
      ...useSchema('type B { id: ID! } type BError { message: String! }'),
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: ['GeneralError'],
          },
        },
      ],
      errors: 1,
    },
  ],
});
