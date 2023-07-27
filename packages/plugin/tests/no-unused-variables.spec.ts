import { join } from 'node:path';
import { RuleTester } from '../src/testkit';
import { rules } from '../src';

const ruleTester = new RuleTester();

ruleTester.run('no-unused-variables', rules['no-unused-variables'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/no-unused-variables.gql'),
      code: ruleTester.fromMockFile('no-unused-variables.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        documents: join(__dirname, 'mocks/user-fields-with-variables.gql'),
      },
    },
  ],
  invalid: [],
});
