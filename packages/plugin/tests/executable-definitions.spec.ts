import { GraphQLRuleTester } from '../src/testkit';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { ParserOptions } from '../src/types';

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
  parserOptions: <ParserOptions>{
    schema: TEST_SCHEMA,
  },
};

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('executable-definitions', GRAPHQL_JS_VALIDATIONS['executable-definitions'], {
  valid: [
    {
      ...WITH_SCHEMA,
      code: `query test2 { foo }`,
    },
    {
      ...WITH_SCHEMA,
      code: `mutation test { foo }`,
    },
    {
      ...WITH_SCHEMA,
      code: `fragment Test on T { foo }`,
    },
  ],
  invalid: [
    {
      ...WITH_SCHEMA,
      code: `type Query { t: String }`,
      errors: [{ message: 'The "Query" definition is not executable.' }],
    },
  ],
});
