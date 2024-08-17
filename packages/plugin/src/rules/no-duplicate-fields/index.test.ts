import { rule } from './index.js';
import { ruleTester } from '../../../__tests__/test-utils.js';

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
