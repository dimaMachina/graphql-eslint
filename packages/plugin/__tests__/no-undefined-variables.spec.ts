import { join } from 'node:path';
import { rules } from '../src';
import { ruleTester } from './test-utils';

ruleTester.run('no-undefined-variables', rules['no-undefined-variables'], {
  valid: [],
  invalid: [
    {
      filename: join(__dirname, 'mocks/no-undefined-variables.gql'),
      code: ruleTester.fromMockFile('no-undefined-variables.gql'),
      parserOptions: {
        graphQLConfig: {
          schema: join(__dirname, 'mocks/user-schema.graphql'),
          documents: join(__dirname, 'mocks/user-fields-with-variables.gql'),
        }
      },
      errors: [
        { message: 'Variable "$limit" is not defined by operation "User".' },
        { message: 'Variable "$offset" is not defined by operation "User".' },
      ],
    },
  ],
});
