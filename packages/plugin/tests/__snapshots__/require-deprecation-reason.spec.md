// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`Invalid #1 1`] = `
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

#### ❌ Error 1/5

      1 |         type A {
    > 2 |           deprecatedWithoutReason: String @deprecated
        |                                            ^^^^^^^^^^ Deprecation reason is required for field "deprecatedWithoutReason" in type "A".
      3 |           deprecatedWithReason: String @deprecated(reason: "Reason")

#### ❌ Error 2/5

      7 |         enum TestEnum {
    > 8 |           item1 @deprecated
        |                  ^^^^^^^^^^ Deprecation reason is required for field "item1" in type "TestEnum".
      9 |           item2 @deprecated(reason: "Reason")

#### ❌ Error 3/5

      12 |         interface TestInterface {
    > 13 |           item1: String @deprecated
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item1" in type "TestInterface".
      14 |           item2: Number @deprecated(reason: "Reason")

#### ❌ Error 4/5

      15 |           item3: String
    > 16 |           item4: String @deprecated(reason: "")
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item4" in type "TestInterface".
      17 |           item5: String @deprecated(reason: "  ")

#### ❌ Error 5/5

      16 |           item4: String @deprecated(reason: "")
    > 17 |           item5: String @deprecated(reason: "  ")
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item5" in type "TestInterface".
      18 |         }
`;
