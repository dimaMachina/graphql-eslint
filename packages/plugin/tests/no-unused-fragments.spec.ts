import { join } from 'path';
import { GraphQLRuleTester } from '../src';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('no-unused-fragments', GRAPHQL_JS_VALIDATIONS['no-unused-fragments'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: [join(__dirname, 'mocks/user-fields.graphql'), join(__dirname, 'mocks/user.graphql')],
      },
    },
    {
      filename: join(__dirname, 'mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: [
          join(__dirname, 'mocks/user-fields.graphql'),
          join(__dirname, 'mocks/post-fields.graphql'),
          join(__dirname, 'mocks/post.graphql'),
        ],
      },
    },
  ],
  invalid: [],
});
