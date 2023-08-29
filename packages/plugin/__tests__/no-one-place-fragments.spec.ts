import { join } from 'node:path';
import { rule } from '../src/rules/no-one-place-fragments';
import { ruleTester } from './test-utils';

ruleTester.run('no-one-place-fragments', rule, {
  valid: [
    {
      name: 'ok when spread 2 times',
      code: ruleTester.fromMockFile('no-one-place-fragments.graphql'),
      parserOptions: {
        graphQLConfig: {
          documents: join(__dirname, 'mocks/no-one-place-fragments.graphql'),
        },
      },
    },
  ],
  invalid: [
    {
      name: 'should error fragment used in one place',
      code: ruleTester.fromMockFile('user-fields.graphql'),
      errors: [
        { message: 'Fragment `UserFields` used only once. Inline him in "146179389.graphql".' },
      ],
      parserOptions: {
        graphQLConfig: {
          documents: /* GraphQL */ `
            {
              user {
                ...UserFields
              }
            }
          `,
        },
      },
    },
  ],
});
