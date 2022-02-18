// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         type A {
       2 |           deprecatedWithoutReason: String @deprecated
       3 |           deprecatedWithReason: String @deprecated(reason: "Reason")
       4 |           notDeprecated: String
       5 |         }
       6 |
       7 |         enum testEnum {
       8 |           item1 @deprecated
       9 |           item2 @deprecated(reason: "Reason")
      10 |         }
      11 |
      12 |         interface testInterface {
      13 |           item1: String @deprecated
      14 |           item2: Number @deprecated(reason: "Reason")
      15 |           item3: String
      16 |           item4: String @deprecated(reason: "")
      17 |           item5: String @deprecated(reason: "  ")
      18 |         }

❌ Error 1/5

      1 |         type A {
    > 2 |           deprecatedWithoutReason: String @deprecated
        |                                            ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      3 |           deprecatedWithReason: String @deprecated(reason: "Reason")

❌ Error 2/5

      7 |         enum testEnum {
    > 8 |           item1 @deprecated
        |                  ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      9 |           item2 @deprecated(reason: "Reason")

❌ Error 3/5

      12 |         interface testInterface {
    > 13 |           item1: String @deprecated
         |                          ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      14 |           item2: Number @deprecated(reason: "Reason")

❌ Error 4/5

      15 |           item3: String
    > 16 |           item4: String @deprecated(reason: "")
         |                          ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      17 |           item5: String @deprecated(reason: "  ")

❌ Error 5/5

      16 |           item4: String @deprecated(reason: "")
    > 17 |           item5: String @deprecated(reason: "  ")
         |                          ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      18 |         }
`;
