import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/require-id-when-available';
import { ParserOptions } from '../src/types';

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
    name: String!
  }
`;

const WITH_SCHEMA = {
  parserOptions: <ParserOptions>{
    schema: TEST_SCHEMA,
    operations: [
      `fragment HasIdFields on HasId {
        id
      }`,
    ],
  },
};
const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('require-id-when-available', rule, {
  valid: [
    { ...WITH_SCHEMA, code: `query { noId { name } }` },
    { ...WITH_SCHEMA, code: `query { hasId { id name } }` },
    { ...WITH_SCHEMA, code: `query { hasId { ...HasIdFields } }` },
    { ...WITH_SCHEMA, code: `query { vehicles { id ...on Car { id mileage } } }` },
    { ...WITH_SCHEMA, code: `query { vehicles { ...on Car { id mileage } } }` },
    { ...WITH_SCHEMA, code: `query { flying { ...on Bird { id } } }` },
    {
      ...WITH_SCHEMA,
      code: `query { hasId { name } }`,
      options: [{ fieldName: 'name' }],
    },
    {
      ...WITH_SCHEMA,
      code: `query { vehicles { id ...on Car { mileage } } }`,
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: `query { hasId { name } }`,
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
    {
      ...WITH_SCHEMA,
      code: `query { hasId { id } }`,
      options: [{ fieldName: 'name' }],
      errors: [{ messageId: 'REQUIRE_ID_WHEN_AVAILABLE' }],
    },
  ],
});
