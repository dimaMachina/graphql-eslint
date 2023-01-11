import { join } from 'node:path';
import { GraphQLRuleTester, ParserOptions } from '../src';
import { rule } from '../src/rules/unique-fragment-name';

const TEST_FRAGMENT = /* GraphQL */ `
  fragment HasIdFields on HasId {
    id
  }
`;

const SIBLING_FRAGMENTS = (
  ...documents: string[]
): { parserOptions: Pick<ParserOptions, 'documents'> } => ({
  parserOptions: {
    documents,
  },
});

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('unique-fragment-name', rule, {
  valid: [
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT),
      code: 'fragment Test on U { a b c }',
    },
    {
      // Assert `skipGraphQLImport` is set to true
      ...SIBLING_FRAGMENTS(
        join(__dirname, 'mocks/user-fields.graphql'),
        join(__dirname, 'mocks/user.graphql'),
      ),
      filename: join(__dirname, 'mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
    },
    {
      // Compare filepath of code as real instead of virtual with siblings
      ...SIBLING_FRAGMENTS(join(__dirname, 'mocks/unique-fragment.js')),
      filename: join(__dirname, 'mocks/unique-fragment.js/0_document.graphql'),
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
