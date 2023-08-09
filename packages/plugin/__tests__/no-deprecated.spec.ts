import { rule } from '../src/rules/no-deprecated';
import { ParserOptionsForTests, ruleTester } from './test-utils';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    oldField: String @deprecated
    oldFieldWithReason: String @deprecated(reason: "test")
    newField: String!
  }

  type Mutation {
    something(t: EnumType): Boolean!
  }

  enum EnumType {
    OLD @deprecated
    OLD_WITH_REASON @deprecated(reason: "test")
    NEW
  }
`;

const WITH_SCHEMA = {
  parserOptions: {
    graphQLConfig: {
      schema: TEST_SCHEMA,
    },
  } satisfies ParserOptionsForTests,
};

ruleTester.run('no-deprecated', rule, {
  valid: [
    { ...WITH_SCHEMA, code: 'query { newField }' },
    { ...WITH_SCHEMA, code: 'mutation { something(t: NEW) }' },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: 'mutation { something(t: OLD) }',
      errors: [
        {
          message:
            'This enum value is marked as deprecated in your GraphQL schema (reason: No longer supported)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: 'mutation { something(t: OLD_WITH_REASON) }',
      errors: [
        {
          message: 'This enum value is marked as deprecated in your GraphQL schema (reason: test)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: 'query { oldField }',
      errors: [
        {
          message:
            'This field is marked as deprecated in your GraphQL schema (reason: No longer supported)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: 'query { oldFieldWithReason }',
      errors: [
        { message: 'This field is marked as deprecated in your GraphQL schema (reason: test)' },
      ],
    },
  ],
});
