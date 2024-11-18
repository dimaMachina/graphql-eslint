import { ParserOptionsForTests, ruleTester } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

const TEST_SCHEMA = /* GraphQL */ `
  input TestInput {
    a: Int @deprecated(reason: "Use 'b' instead.")
    b: Boolean
  }

  type Query {
    oldField: String @deprecated
    oldFieldWithReason: String @deprecated(reason: "test")
    newField: String!
    testArgument(a: Int @deprecated(reason: "Use 'b' instead."), b: Boolean): Boolean
    testObjectField(input: TestInput): Boolean
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
    { ...WITH_SCHEMA, code: '{ newField }' },
    { ...WITH_SCHEMA, code: 'mutation { something(t: NEW) }' },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: 'mutation { something(t: OLD) }',
      errors: [
        {
          message:
            'Enum "OLD" is marked as deprecated in your GraphQL schema (reason: No longer supported)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: 'mutation { something(t: OLD_WITH_REASON) }',
      errors: [
        {
          message:
            'Enum "OLD_WITH_REASON" is marked as deprecated in your GraphQL schema (reason: test)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: '{ oldField }',
      errors: [
        {
          message:
            'Field "oldField" is marked as deprecated in your GraphQL schema (reason: No longer supported)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: '{ oldFieldWithReason }',
      errors: [
        {
          message:
            'Field "oldFieldWithReason" is marked as deprecated in your GraphQL schema (reason: test)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: '{ testArgument(a: 2) }',
      errors: [
        {
          message:
            'Argument "a" is marked as deprecated in your GraphQL schema (reason: Use \'b\' instead.)',
        },
      ],
    },
    {
      ...WITH_SCHEMA,
      code: '{ testObjectField(input: { a:2 }) }',
      errors: [
        {
          message:
            'Object field "a" is marked as deprecated in your GraphQL schema (reason: Use \'b\' instead.)',
        },
      ],
    },
  ],
});
