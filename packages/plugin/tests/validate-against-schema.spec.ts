import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/validate-against-schema';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    user(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
  }
`;

const WITH_SCHEMA = { parserOptions: { schema: TEST_SCHEMA } };
const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('validate-against-schema', rule, {
  valid: [
    { ...WITH_SCHEMA, code: `query { user(id: 1) { id } }` },
    { ...WITH_SCHEMA, code: `query test($id: ID!) { user(id: $id) { id } }` },
    { ...WITH_SCHEMA, code: `query named ($id: ID!) { user(id: $id) { id } }` },
    {
      ...WITH_SCHEMA,
      options: [{ disableRules: ['KnownDirectivesRule'] }],
      code: `query named ($id: ID!) { user(id: $id) { id @client } }`,
    },
    {
      ...WITH_SCHEMA,
      options: [{ overrideRules: ['NoUnusedVariablesRule'] }],
      code: `query named ($id: ID!) { user(id: $id) { id @client } }`,
    },
    {
      ...WITH_SCHEMA,
      code: `fragment UserFields on User { id }`,
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: `query { user(id: 1) { notExists } }`,
      errors: ['[FieldsOnCorrectTypeRule] Cannot query field "notExists" on type "User".'],
    },
    {
      ...WITH_SCHEMA,
      options: [{ overrideRules: ['NoUnusedVariablesRule'] }],
      code: `query named ($id: ID!) { user(id: 2) { id @client } }`,
      errors: ['[NoUnusedVariablesRule] Variable "$id" is never used in operation "named".'],
    },
    {
      ...WITH_SCHEMA,
      errors: ['[KnownDirectivesRule] Unknown directive "@client".'],
      code: `query named ($id: ID!) { user(id: $id) { id @client } }`,
    },
    {
      ...WITH_SCHEMA,
      errors: ['[KnownDirectivesRule] Unknown directive "@client".'],
      options: [{ overrideRules: ['KnownDirectivesRule'] }],
      code: `query named ($id: ID!) { user(id: $id) { id @client } }`,
    },
    {
      ...WITH_SCHEMA,
      code: `query test($id: ID!) { user(invalid: $id) { test } }`,
      errors: [
        '[ProvidedRequiredArgumentsRule] Field "user" argument "id" of type "ID!" is required, but it was not provided.',
        '[KnownArgumentNamesRule] Unknown argument "invalid" on field "Query.user".',
        '[FieldsOnCorrectTypeRule] Cannot query field "test" on type "User".',
      ],
    },
  ],
});
