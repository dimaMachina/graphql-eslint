import { join } from 'node:path';
import { CWD } from '@/utils.js';
import { ParserOptionsForTests, ruleTester } from '../../../__tests__/test-utils.js';
import { rule } from './index.js';

const TEST_FRAGMENT = /* GraphQL */ `
  fragment HasIdFields on HasId {
    id
  }
`;

const SIBLING_FRAGMENTS = (...documents: string[]) => ({
  parserOptions: {
    graphQLConfig: {
      documents,
    },
  } satisfies ParserOptionsForTests,
});

ruleTester.run('unique-fragment-name', rule, {
  valid: [
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT),
      code: 'fragment Test on U { a b c }',
    },
    {
      // Assert `skipGraphQLImport` is set to true
      ...SIBLING_FRAGMENTS(
        join(CWD, '__tests__/mocks/user-fields.graphql'),
        join(CWD, '__tests__/mocks/user.graphql'),
      ),
      filename: join(CWD, '__tests__/mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
    },
    {
      // Compare filepath of code as real instead of virtual with siblings
      ...SIBLING_FRAGMENTS(join(CWD, '__tests__/mocks/unique-fragment.js')),
      filename: join(CWD, '__tests__/mocks/unique-fragment.js/0_document.graphql'),
      code: /* GraphQL */ `
        fragment UserFields on User {
          id
        }
      `,
    },
  ],
  invalid: [
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT),
      code: 'fragment HasIdFields on U { a b c }',
      errors: [{ messageId: 'unique-fragment-name' }],
    },
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT, 'fragment HasIdFields on U { t }'),
      code: 'fragment HasIdFields on U { a b c }',
      errors: [{ messageId: 'unique-fragment-name' }],
    },
  ],
});
