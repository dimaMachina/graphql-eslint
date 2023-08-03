import { ParserOptions, rules } from '../src';
import { ruleTester } from './test-utils';

const parserOptions: Pick<ParserOptions, 'schema'> = {
  schema: /* GraphQL */ `
    type User {
      id: ID
      age: Int
    }

    type Query {
      user: User
    }
  `,
};

ruleTester.run('fields-on-correct-type', rules['fields-on-correct-type'], {
  valid: [],
  invalid: [
    {
      name: 'should highlight selection on single line',
      code: 'fragment UserFields on User { id bad age }',
      parserOptions,
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
      parserOptions,
      errors: [{ message: 'Cannot query field "veryBad" on type "User".' }],
    },
  ],
});