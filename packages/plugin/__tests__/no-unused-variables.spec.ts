import { join } from 'node:path';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { ruleTester } from './test-utils';

ruleTester.run('no-unused-variables', GRAPHQL_JS_VALIDATIONS['no-unused-variables'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/no-unused-variables.gql'),
      code: ruleTester.fromMockFile('no-unused-variables.gql'),
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: join(__dirname, 'mocks/user-fields-with-variables.gql'),
        },
      },
    },
  ],
  invalid: [],
});
