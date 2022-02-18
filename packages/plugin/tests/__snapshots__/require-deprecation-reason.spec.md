// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         type A {
       2 |           deprecatedWithoutReason: String @deprecated
       3 |           deprecatedWithReason: String @deprecated(reason: "Reason")
       4 |           notDeprecated: String
       5 |         }
       6 |         enum testEnum {
       7 |           item1 @deprecated
       8 |           item2 @deprecated(reason: "Reason")
       9 |         }
      10 |         interface testInterface {
      11 |           item1: String @deprecated
      12 |           item2: Number @deprecated(reason: "Reason")
      13 |           item3: String
      14 |           item4: String @deprecated(reason: "")
      15 |           item5: String @deprecated(reason: "  ")
      16 |         }

❌ Error 1/5

      1 |         type A {
    > 2 |           deprecatedWithoutReason: String @deprecated
        |                                            ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      3 |           deprecatedWithReason: String @deprecated(reason: "Reason")

❌ Error 2/5

      6 |         enum testEnum {
    > 7 |           item1 @deprecated
        |                  ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      8 |           item2 @deprecated(reason: "Reason")

❌ Error 3/5

      10 |         interface testInterface {
    > 11 |           item1: String @deprecated
         |                          ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      12 |           item2: Number @deprecated(reason: "Reason")

❌ Error 4/5

      13 |           item3: String
    > 14 |           item4: String @deprecated(reason: "")
         |                          ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      15 |           item5: String @deprecated(reason: "  ")

❌ Error 5/5

      14 |           item4: String @deprecated(reason: "")
    > 15 |           item5: String @deprecated(reason: "  ")
         |                          ^^^^^^^^^^ Directive "@deprecated" must have a reason!
      16 |         }
`;
