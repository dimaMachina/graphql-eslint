// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`require-deprecation-reason > invalid > Invalid #1 1`] = `
#### ⌨️ Code

       1 |         type A {
       2 |           deprecatedWithoutReason: String @deprecated
       3 |           deprecatedWithReason: String @deprecated(reason: "Reason")
       4 |           notDeprecated: String
       5 |         }
       6 |
       7 |         enum TestEnum {
       8 |           item1 @deprecated
       9 |           item2 @deprecated(reason: "Reason")
      10 |         }
      11 |
      12 |         interface TestInterface {
      13 |           item1: String @deprecated
      14 |           item2: Number @deprecated(reason: "Reason")
      15 |           item3: String
      16 |           item4: String @deprecated(reason: "")
      17 |           item5: String @deprecated(reason: "  ")
      18 |         }
      19 |
      20 |         type MyQuery @deprecated
      21 |
      22 |         input MyInput {
      23 |           foo: String! @deprecated
      24 |         }

#### ❌ Error 1/7

      1 |         type A {
    > 2 |           deprecatedWithoutReason: String @deprecated
        |                                            ^^^^^^^^^^ Deprecation reason is required for field "deprecatedWithoutReason" in type "A".
      3 |           deprecatedWithReason: String @deprecated(reason: "Reason")

#### ❌ Error 2/7

      7 |         enum TestEnum {
    > 8 |           item1 @deprecated
        |                  ^^^^^^^^^^ Deprecation reason is required for enum value "item1" in enum "TestEnum".
      9 |           item2 @deprecated(reason: "Reason")

#### ❌ Error 3/7

      12 |         interface TestInterface {
    > 13 |           item1: String @deprecated
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item1" in interface "TestInterface".
      14 |           item2: Number @deprecated(reason: "Reason")

#### ❌ Error 4/7

      15 |           item3: String
    > 16 |           item4: String @deprecated(reason: "")
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item4" in interface "TestInterface".
      17 |           item5: String @deprecated(reason: "  ")

#### ❌ Error 5/7

      16 |           item4: String @deprecated(reason: "")
    > 17 |           item5: String @deprecated(reason: "  ")
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item5" in interface "TestInterface".
      18 |         }

#### ❌ Error 6/7

      19 |
    > 20 |         type MyQuery @deprecated
         |                       ^^^^^^^^^^ Deprecation reason is required for type "MyQuery".
      21 |

#### ❌ Error 7/7

      22 |         input MyInput {
    > 23 |           foo: String! @deprecated
         |                         ^^^^^^^^^^ Deprecation reason is required for input value "foo" in input "MyInput".
      24 |         }
`;
