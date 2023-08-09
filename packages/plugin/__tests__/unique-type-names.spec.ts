import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { ParserOptionsForTests, ruleTester } from './test-utils';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    foo: String
    bar: Boolean
  }
`;

const WITH_SCHEMA = {
  parserOptions: {
    graphQLConfig: {
      schema: TEST_SCHEMA,
    },
  } satisfies ParserOptionsForTests,
};

ruleTester.run('unique-type-names', GRAPHQL_JS_VALIDATIONS['unique-type-names'], {
  valid: [
    { ...WITH_SCHEMA, code: TEST_SCHEMA },
    {
      ...WITH_SCHEMA,
      code: /* GraphQL */ `
        type Query {
          foo: String
        }

        extend type Query {
          bar: Boolean
        }
      `,
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: /* GraphQL */ `
        type Query {
          foo: String
        }

        type Query {
          bar: Boolean
        }
      `,
      errors: [{ message: 'There can be only one type named "Query".' }],
    },
  ],
});
