import { rule, RuleOptions } from '../src/rules/strict-id-in-types';
import { ruleTester, withSchema } from './test-utils';

ruleTester.run<RuleOptions>('strict-id-in-types', rule, {
  valid: [
    withSchema({ code: 'type A { id: ID! }' }),
    withSchema({
      code: 'type A { _id: String! }',
      options: [
        {
          acceptedIdNames: ['_id'],
          acceptedIdTypes: ['String'],
        },
      ],
    }),
    withSchema({
      code: 'type A { _id: String! } type A1 { id: ID! }',
      options: [
        {
          acceptedIdNames: ['id', '_id'],
          acceptedIdTypes: ['ID', 'String'],
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type AResult { key: String! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: ['Result'],
          },
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type A1 { id: ID! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: [''],
          },
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type A1 { id: ID! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type AResult { key: String! } type APayload { bool: Boolean! } type APagination { num: Int! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: ['Result', 'Payload', 'Pagination'],
          },
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type AError { message: String! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: ['AError'],
          },
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type AGeneralError { message: String! } type AForbiddenError { message: String! }',

      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: ['AGeneralError', 'AForbiddenError'],
          },
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            types: [''],
          },
        },
      ],
    }),
    withSchema({
      code: 'type A { id: ID! } type AError { message: String! } type AResult { payload: A! }',
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
    }),
    withSchema({
      name: 'should ignore root types',
      code: /* GraphQL */ `
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
      `,
    }),
    withSchema({
      name: 'should ignore root types that are renamed',
      code: /* GraphQL */ `
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
      `,
    }),
  ],
  invalid: [
    withSchema({
      code: 'type B { name: String! }',
      errors: 1,
    }),
    withSchema({
      code: 'type B { id: ID! _id: String! }',
      options: [
        {
          acceptedIdNames: ['id', '_id'],
          acceptedIdTypes: ['ID', 'String'],
        },
      ],
      errors: 1,
    }),
    withSchema({
      code: 'type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['String'],
        },
      ],
      errors: 4,
    }),
    withSchema({
      code: 'type B { id: ID! } type Bresult { key: String! } type BPayload { bool: Boolean! } type BPagination { num: Int! }',
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
    }),
    withSchema({
      code: 'type B { id: ID! } type BError { message: String! }',
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
    }),
  ],
});
