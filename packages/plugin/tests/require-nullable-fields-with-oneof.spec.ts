import { GraphQLRuleTester } from '../src';
import { rule } from '../src/rules/require-nullable-fields-with-oneof';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('require-nullable-fields-with-oneof', rule, {
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
