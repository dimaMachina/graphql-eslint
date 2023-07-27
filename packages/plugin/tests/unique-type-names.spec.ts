import { ParserOptions } from '../src';
import { RuleTester } from '../src/testkit';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    foo: String
    bar: Boolean
  }
`;

const WITH_SCHEMA = {
  parserOptions: {
    schema: TEST_SCHEMA,
    documents: [],
  } as ParserOptions,
};

const ruleTester = new RuleTester();

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
