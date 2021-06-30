import { join } from 'path';
import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/unique-fragment-name';

const TEST_FRAGMENT = /* GraphQL */ `
  fragment HasIdFields on HasId {
    id
  }
`;

const SIBLING_FRAGMENTS = (...operations: string[]) => ({
  parserOptions: <ParserOptions>{
    operations,
  },
});
const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('unique-fragment-name', rule, {
  valid: [
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT),
      code: `fragment Test on U { a b c }`,
    },
    {
      ...SIBLING_FRAGMENTS(join(__dirname, 'mocks/user-fields.graphql'), join(__dirname, 'mocks/user.graphql')),
      filename: join(__dirname, 'mocks/user-fields.graphql'),
      code: ruleTester.fromMockFile('user-fields.graphql'),
    },
  ],
  invalid: [
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT),
      code: `fragment HasIdFields on U { a b c }`,
      errors: [{ messageId: 'UNIQUE_FRAGMENT_NAME' }],
    },
    {
      ...SIBLING_FRAGMENTS(TEST_FRAGMENT, `fragment HasIdFields on U { t }`),
      code: `fragment HasIdFields on U { a b c }`,
      errors: [{ messageId: 'UNIQUE_FRAGMENT_NAME' }],
    },
  ],
});
