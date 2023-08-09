import { join } from 'node:path';
import { rules } from '../src';
import { ruleTester } from './test-utils';

ruleTester.run('no-unused-variables', rules['no-unused-variables'], {
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
