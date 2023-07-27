import { ParserOptions } from '../src';
import { RuleTester } from '../src/testkit';
import { rule } from '../src/rules/no-deprecated';

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
    schema: TEST_SCHEMA,
    documents: [],
  } as ParserOptions,
};
const ruleTester = new RuleTester();

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
