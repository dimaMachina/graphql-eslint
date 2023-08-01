import { rule } from '../src/rules/require-type-pattern-with-oneof';
import { ruleTester } from './test-utils';

ruleTester.run('require-type-pattern-with-oneof', rule, {
  valid: [
    /* GraphQL */ `
      type T @oneOf {
        ok: Ok
        error: Error
      }
    `,
    {
      name: 'should ignore types without `@oneOf` directive',
      code: /* GraphQL */ `
        type T {
          notok: Ok
          err: Error
        }
      `,
    },
    {
      name: 'should validate only `type` with `@oneOf` directive',
      code: /* GraphQL */ `
        input I {
          notok: Ok
          err: Error
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'should validate `ok` field',
      code: /* GraphQL */ `
        type T @oneOf {
          notok: Ok
          error: Error
        }
      `,
      errors: 1,
    },
    {
      name: 'should validate `error` field',
      code: /* GraphQL */ `
        type T @oneOf {
          ok: Ok
          err: Error
        }
      `,
      errors: 1,
    },
  ],
});
