import { rule } from '../src/rules/no-duplicate-fields';
import { ruleTester } from './test-utils';

ruleTester.run('no-duplicate-fields', rule, {
  valid: [],
  invalid: [
    {
      code: /* GraphQL */ `
        query test($v: String, $t: String, $v: String) {
          id
        }
      `,
      errors: [{ message: 'Variable `v` defined multiple times.' }],
    },
    {
      code: /* GraphQL */ `
        query test {
          users(first: 100, after: 10, filter: "test", first: 50) {
            id
          }
        }
      `,
      errors: [{ message: 'Argument `first` defined multiple times.' }],
    },
    {
      code: /* GraphQL */ `
        query test {
          users {
            id
            name
            email
            name
          }
        }
      `,
      errors: [{ message: 'Field `name` defined multiple times.' }],
    },
    {
      code: /* GraphQL */ `
        query test {
          users {
            id
            name
            email
            email: somethingElse
          }
        }
      `,
      errors: [{ message: 'Field `email` defined multiple times.' }],
    },
  ],
});
