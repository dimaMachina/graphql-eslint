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

const WITH_SCHEMA = {
  parserOptions: <ParserOptions>{
    schema: TEST_SCHEMA,
    operations: '{ foo }',
  },
};

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests<[RequireIdWhenAvailableRuleConfig]>('require-id-when-available', rule, {
  valid: [
    {
      ...WITH_SCHEMA,
      name: 'should ignore FragmentDefinition',
      code: 'fragment Test on HasId { name }',
    },
    {
      name: "should ignore checking selections on OperationDefinition as it's redundant check",
      code: '{ foo }',
      parserOptions: {
        schema: 'type Query { id: ID }',
        operations: '{ foo }',
      },
    },
    { ...WITH_SCHEMA, code: '{ noId { name } }' },
    { ...WITH_SCHEMA, code: '{ hasId { id name } }' },
    {
      name: 'should find selection in fragment',
      code: '{ hasId { ...HasIdFields } }',
      parserOptions: {
        schema: TEST_SCHEMA,
        operations: 'fragment HasIdFields on HasId { id }',
      },
    },
    { ...WITH_SCHEMA, code: '{ vehicles { id ...on Car { id mileage } } }' },
    { ...WITH_SCHEMA, code: '{ vehicles { ...on Car { id mileage } } }' },
    { ...WITH_SCHEMA, code: '{ flying { ...on Bird { id } } }' },
    {
      ...WITH_SCHEMA,
      code: '{ hasId { name } }',
      options: [{ fieldName: 'name' }],
    },
    {
      ...WITH_SCHEMA,
      code: '{ vehicles { id ...on Car { mileage } } }',
    },
    {
      ...WITH_SCHEMA,
      name: 'support multiple id field names',
      code: '{ hasId { _id } }',
      options: [{ fieldName: ['id', '_id'] }],
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: '{ hasId { name } }',
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      ...WITH_SCHEMA,
      code: '{ hasId { id } }',
      options: [{ fieldName: 'name' }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      ...WITH_SCHEMA,
      name: 'support multiple id field names',
      code: '{ hasId { name } }',
      options: [{ fieldName: ['id', '_id'] }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
  ],
});
