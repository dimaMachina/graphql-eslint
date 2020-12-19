import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/unique-fragment-name';
import { ParserOptions } from '../src/types';

const TEST_FRAGMENT = `fragment HasIdFields on HasId {
  id
}`;

const SIBLING_FRAGMENTS = (fragments: string[] = [TEST_FRAGMENT]) => ({
  parserOptions: <ParserOptions>{
    operations: fragments,
  },
});
const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('unique-fragment-name', rule, {
  valid: [
    {
      ...SIBLING_FRAGMENTS(),
      code: `fragment Test on U { a b c }`,
    },
  ],
  invalid: [
    {
      ...SIBLING_FRAGMENTS(),
      code: `fragment HasIdFields on U { a b c }`,
      errors: [{ messageId: 'UNIQUE_FRAGMENT_NAME' }],
    },
    {
      ...SIBLING_FRAGMENTS([TEST_FRAGMENT, `fragment HasIdFields on U { t }`]),
      code: `fragment HasIdFields on U { a b c }`,
      errors: [{ messageId: 'UNIQUE_FRAGMENT_NAME' }],
    },
  ],
});
