import { ParserOptions, rules } from '../src';
import { DEFAULT_CONFIG } from './test-utils';
import { RuleTester } from '@theguild/eslint-rule-tester';

const ruleTester = new RuleTester<Partial<ParserOptions>>({
  ...DEFAULT_CONFIG,
  parserOptions: {
    graphQLConfig: {
      schema: /* GraphQL */ `
        type User {
          id: ID
          age: Int
        }

        type Query {
          user: User
        }
      `,
    },
  },
});

ruleTester.run('fields-on-correct-type', rules['fields-on-correct-type'], {
  valid: [],
  invalid: [
    {
      name: 'should highlight selection on single line',
      code: 'fragment UserFields on User { id bad age }',
      errors: [{ message: 'Cannot query field "bad" on type "User". Did you mean "id"?' }],
    },
    {
      name: 'should highlight selection on multi line',
      code: /* GraphQL */ `
        {
          user {
            id
            veryBad
            age
          }
        }
      `,
      errors: [{ message: 'Cannot query field "veryBad" on type "User".' }],
    },
  ],
});
