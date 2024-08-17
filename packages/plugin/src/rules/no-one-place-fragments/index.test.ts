import { join } from 'node:path';
import { ruleTester } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

ruleTester.run('no-one-place-fragments', rule, {
  valid: [
    {
      name: 'ok when spread 2 times',
      code: ruleTester.fromMockFile('no-one-place-fragments.graphql'),
      parserOptions: {
        graphQLConfig: {
          documents: join(process.cwd(), '__tests__/mocks/no-one-place-fragments.graphql'),
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
