import { rule } from '../src/rules/require-nullable-fields-with-oneof';
import { ruleTester } from './test-utils';

ruleTester.run('require-nullable-fields-with-oneof', rule, {
  valid: [
    /* GraphQL */ `
      input Input @oneOf {
        foo: [String]
        bar: Int
      }
    `,
    /* GraphQL */ `
      type User @oneOf {
        foo: String
        bar: [Int!]
      }
    `,
  ],
  invalid: [
    {
      name: 'should validate `input`',
      code: /* GraphQL */ `
        input Input @oneOf {
          foo: String!
          bar: [Int]!
        }
      `,
      errors: 2,
    },
    {
      name: 'should validate `type`',
      code: /* GraphQL */ `
        type Type @oneOf {
          foo: String!
          bar: Int
        }
      `,
      errors: 1,
    },
  ],
});
