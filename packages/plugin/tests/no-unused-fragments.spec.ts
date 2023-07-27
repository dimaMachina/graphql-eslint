import { join } from 'node:path';
import { rules } from '../src';
import { RuleTester } from '../src/testkit';

const ruleTester = new RuleTester();

ruleTester.run('no-unused-fragments', rules['no-unused-fragments'], {
  valid: [
    {
      name: 'should find file with operation definition that import current fragment',
      filename: join(__dirname, 'mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        documents: [
          join(__dirname, 'mocks/user-fields.graphql'),
          join(__dirname, 'mocks/post-fields.graphql'),
          join(__dirname, 'mocks/post.graphql'),
        ],
      },
    },
  ],
  invalid: [],
});
