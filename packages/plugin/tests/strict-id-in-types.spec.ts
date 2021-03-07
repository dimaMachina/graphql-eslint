import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/strict-id-in-types';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('strict-id-in-types', rule, {
  valid: [
    {
      code: 'type A { id: ID! }',
    },
    {
      code: 'type A { _id: String! }',
      options: [
        {
          acceptedIdNames: ['_id'],
          acceptedIdTypes: ['String'],
        },
      ],
    },
    {
      code: 'type A { _id: String! } type A1 { id: ID! }',
      options: [
        {
          acceptedIdNames: ['id', '_id'],
          acceptedIdTypes: ['ID', 'String'],
        },
      ],
    },
    {
      code: 'type A { id: ID! } type AResult { key: String! } ',
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
      code: 'type A { id: ID! } type A1 { id: ID! } ',
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
      code: 'type A { id: ID! } type A1 { id: ID! } ',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: [],
          },
        },
      ],
    },
    {
      code:
        'type A { id: ID! } type AResult { key: String! } type APayload { bool: Boolean! } type APagination { num: Int! }',
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ],
  invalid: [
    {
      code: 'type B { name: String! }',
      errors: [
        {
          message:
            'B must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): ID',
        },
      ],
    },
    {
      code: 'type B { id: ID! _id: String! }',
      options: [
        {
          acceptedIdNames: ['id', '_id'],
          acceptedIdTypes: ['ID', 'String'],
        },
      ],
      errors: [
        {
          message:
            'B must have exactly one non-nullable unique identifier. Accepted name(s): id,_id ; Accepted type(s): ID,String',
        },
      ],
    },
    {
      code:
        'type B { id: String! } type B1 { id: [String] } type B2 { id: [String!] } type B3 { id: [String]! } type B4 { id: [String!]! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['String'],
        },
      ],
      errors: [
        {
          message:
            'B1 must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): String',
        },
        {
          message:
            'B2 must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): String',
        },
        {
          message:
            'B3 must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): String',
        },
        {
          message:
            'B4 must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): String',
        },
      ],
    },
    {
      code:
        'type B { id: ID! } type Bresult { key: String! } type BPayload { bool: Boolean! } type BPagination { num: Int! }',
      options: [
        {
          acceptedIdNames: ['id'],
          acceptedIdTypes: ['ID'],
          exceptions: {
            suffixes: ['Result', 'Payload'],
          },
        },
      ],
      errors: [
        {
          message:
            'Bresult must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): ID',
        },
        {
          message:
            'BPagination must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): ID',
        },
      ],
    },
    {
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
      errors: [
        {
          message:
            'BError must have exactly one non-nullable unique identifier. Accepted name(s): id ; Accepted type(s): ID',
        },
      ],
    },
  ],
});
