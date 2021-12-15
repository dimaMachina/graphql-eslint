import { GraphQLRuleTester, ParserOptions } from '../src';
import rule, { RequireIdWhenAvailableRuleConfig } from '../src/rules/require-id-when-available';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    hasId: HasId!
    noId: NoId!
    vehicles: [Vehicle!]!
    flying: [Flying!]!
  }

  type NoId {
    name: String!
  }

  interface Vehicle {
    id: ID!
  }

  type Car implements Vehicle {
    id: ID!
    mileage: Int
  }

  interface Flying {
    hasWings: Boolean!
  }

  type Bird implements Flying {
    id: ID!
    hasWings: Boolean!
  }

  type HasId {
    id: ID!
    _id: ID!
    name: String!
  }
`;

const parserOptions: ParserOptions = {
  schema: TEST_SCHEMA,
  operations: 'fragment HasIdFields on HasId { id }',
};

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests<[RequireIdWhenAvailableRuleConfig]>('require-id-when-available', rule, {
  valid: [
    {
      parserOptions,
      name: 'should ignore fragments',
      code: 'fragment Test on HasId { name }',
    },
    { parserOptions, code: '{ noId { name } }' },
    { parserOptions, code: '{ hasId { id name } }' },
    {
      parserOptions,
      name: 'should find id in fragment',
      code: '{ hasId { ...HasIdFields } }'
    },
    { parserOptions, code: '{ vehicles { id ...on Car { id mileage } } }' },
    { parserOptions, code: '{ vehicles { ...on Car { id mileage } } }' },
    { parserOptions, code: '{ flying { ...on Bird { id } } }' },
    {
      parserOptions,
      code: '{ hasId { name } }',
      options: [{ fieldName: 'name' }],
    },
    {
      parserOptions,
      code: '{ vehicles { id ...on Car { mileage } } }',
    },
    {
      parserOptions,
      name: 'support multiple id field names',
      code: '{ hasId { _id } }',
      options: [{ fieldName: ['id', '_id'] }],
    },
  ],
  invalid: [
    {
      parserOptions,
      code: '{ hasId { name } }',
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      parserOptions,
      code: '{ hasId { id } }',
      options: [{ fieldName: 'name' }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      parserOptions,
      name: 'support multiple id field names',
      code: '{ hasId { name } }',
      options: [{ fieldName: ['id', '_id'] }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
  ],
});
