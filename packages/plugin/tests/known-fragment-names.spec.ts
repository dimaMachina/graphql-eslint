import { join } from 'path';
import { GraphQLRuleTester } from '../src';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('known-fragment-names', GRAPHQL_JS_VALIDATIONS['known-fragment-names'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/user.graphql'),
      code: ruleTester.fromMockFile('user.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
      },
    },
  ],
  invalid: [],
});
