import { GraphQLRuleTester } from '../src/testkit';
import rule from '../src/rules/unique-operation-name';
import { ParserOptions } from '../src/types';

const TEST_OPERATION = `query test { foo }`;

const SIBLING_OPERATIONS = (operations: string[] = [TEST_OPERATION]) => ({
  parserOptions: <ParserOptions>{
    operations,
  },
});

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('unique-operation-name', rule, {
  valid: [
    {
      ...SIBLING_OPERATIONS(),
      code: `query test2 { foo }`,
    },
  ],
  invalid: [
    {
      ...SIBLING_OPERATIONS(),
      code: `query test { bar }`,
      errors: [{ messageId: 'UNIQUE_OPERATION_NAME' }],
    },
    {
      ...SIBLING_OPERATIONS([TEST_OPERATION, `query test { bar2 }`]),
      code: `query test { bar }`,
      errors: [{ messageId: 'UNIQUE_OPERATION_NAME' }],
    },
  ],
});
