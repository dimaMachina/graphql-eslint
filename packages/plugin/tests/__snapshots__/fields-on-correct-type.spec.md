// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`fields-on-correct-type > invalid > should highlight selection on multi line 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           user {
      3 |             id
      4 |             veryBad
      5 |             age
      6 |           }
      7 |         }

#### ❌ Error

      3 |             id
    > 4 |             veryBad
        |             ^^^^^^^ Cannot query field "veryBad" on type "User".
      5 |             age
`;

exports[`fields-on-correct-type > invalid > should highlight selection on single line 1`] = `
#### ⌨️ Code

      1 | fragment UserFields on User { id bad age }

#### ❌ Error

    > 1 | fragment UserFields on User { id bad age }
        |                                  ^^^ Cannot query field "bad" on type "User". Did you mean "id"?

#### 💡 Suggestion: Rename to \`id\`

    1 | fragment UserFields on User { id id age }
`;
