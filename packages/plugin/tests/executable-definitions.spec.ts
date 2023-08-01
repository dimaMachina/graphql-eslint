import { ParserOptions } from '../src';
import { RuleTester } from '@theguild/eslint-rule-tester';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const TEST_SCHEMA = /* GraphQL */ `
  type Query {
    foo: String!
    bar: String!
  }

  type Mutation {
    foo: String!
  }

  type T {
    foo: String!
  }
`;

const WITH_SCHEMA = {
  parserOptions: {
    schema: TEST_SCHEMA,
  } as ParserOptions,
};

const ruleTester = new RuleTester();

ruleTester.run('executable-definitions', GRAPHQL_JS_VALIDATIONS['executable-definitions'], {
  valid: [
    {
      ...WITH_SCHEMA,
      code: 'query test2 { foo }',
    },
    {
      ...WITH_SCHEMA,
      code: 'mutation test { foo }',
    },
    {
      ...WITH_SCHEMA,
      code: 'fragment Test on T { foo }',
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: 'type Query { t: String }',
      errors: [{ message: 'The "Query" definition is not executable.' }],
    },
  ],
});
