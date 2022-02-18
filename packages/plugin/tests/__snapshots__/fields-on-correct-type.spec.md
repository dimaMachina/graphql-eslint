// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

    > 1 | fragment UserFields on User { id bad age }
        |                                  ^^^ Cannot query field "bad" on type "User". Did you mean "id"?
`;

exports[` 2`] = `
❌ Error

      1 |         {
      2 |           user {
      3 |             id
    > 4 |             veryBad
        |             ^^^^^^^ Cannot query field "veryBad" on type "User".
      5 |             age
      6 |           }
      7 |         }
`;
