import { rule } from '../src/rules/require-deprecation-reason';
import { ruleTester } from './test-utils';

ruleTester.run('require-deprecation-reason', rule, {
  valid: [
    /* GraphQL */ `
      query getUser {
        f
        a
        b
      }
    `,
    /* GraphQL */ `
      type test {
        field1: String @authorized
        field2: Number
        field4: String @deprecated(reason: "Reason")
      }

      enum testEnum {
        item1 @authorized
        item2 @deprecated(reason: 0)
        item3
      }

      interface testInterface {
        field1: String @authorized
        field2: Number
        field3: String @deprecated(reason: 1.5)
      }
    `,
  ],
  invalid: [
    {
      code: /* GraphQL */ `
        type A {
          deprecatedWithoutReason: String @deprecated
          deprecatedWithReason: String @deprecated(reason: "Reason")
          notDeprecated: String
        }

        enum TestEnum {
          item1 @deprecated
          item2 @deprecated(reason: "Reason")
        }

        interface TestInterface {
          item1: String @deprecated
          item2: Number @deprecated(reason: "Reason")
          item3: String
          item4: String @deprecated(reason: "")
          item5: String @deprecated(reason: "  ")
        }

        type MyQuery @deprecated

        input MyInput {
          foo: String! @deprecated
        }
      `,
      errors: 7,
    },
  ],
});
