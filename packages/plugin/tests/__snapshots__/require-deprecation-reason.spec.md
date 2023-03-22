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
      19 |         
      20 |         
      21 |         type MyQuery @deprecated

#### ❌ Error 1/6

      1 |         type A {
    > 2 |           deprecatedWithoutReason: String @deprecated
        |                                            ^^^^^^^^^^ Deprecation reason is required for field "deprecatedWithoutReason" in type "A".
      3 |           deprecatedWithReason: String @deprecated(reason: "Reason")

#### ❌ Error 2/6

      7 |         enum TestEnum {
    > 8 |           item1 @deprecated
        |                  ^^^^^^^^^^ Deprecation reason is required for enum value "item1" in enum "TestEnum".
      9 |           item2 @deprecated(reason: "Reason")

#### ❌ Error 3/6

      12 |         interface TestInterface {
    > 13 |           item1: String @deprecated
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item1" in interface "TestInterface".
      14 |           item2: Number @deprecated(reason: "Reason")

#### ❌ Error 4/6

      15 |           item3: String
    > 16 |           item4: String @deprecated(reason: "")
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item4" in interface "TestInterface".
      17 |           item5: String @deprecated(reason: "  ")

#### ❌ Error 5/6

      16 |           item4: String @deprecated(reason: "")
    > 17 |           item5: String @deprecated(reason: "  ")
         |                          ^^^^^^^^^^ Deprecation reason is required for field "item5" in interface "TestInterface".
      18 |         }

#### ❌ Error 6/6

      20 |         
    > 21 |         type MyQuery @deprecated
         |                       ^^^^^^^^^^ Deprecation reason is required for type "MyQuery".
`;
