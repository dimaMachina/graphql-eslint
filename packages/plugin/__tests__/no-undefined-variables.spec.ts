import { join } from 'node:path';
import { GRAPHQL_JS_VALIDATIONS } from '../src/rules/graphql-js-validation';
import { ruleTester } from './test-utils';

ruleTester.run('no-undefined-variables', GRAPHQL_JS_VALIDATIONS['no-undefined-variables'], {
  valid: [],
  invalid: [
    {
      filename: join(__dirname, 'mocks/no-undefined-variables.gql'),
      code: ruleTester.fromMockFile('no-undefined-variables.gql'),
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: join(__dirname, 'mocks/user-fields-with-variables.gql'),
        },
      },
      errors: [
        { message: 'Variable "$limit" is not defined by operation "User".' },
        { message: 'Variable "$offset" is not defined by operation "User".' },
      ],
    },
  ],
});
