// Vitest Snapshot v1

exports[`should not throw an error on undefined fragment 1`] = `
#### ⌨️ Code

      1 | {
      2 |   user {
      3 |     ...DoesNotExist
      4 |   }
      5 | }

#### ❌ Error

      2 |   user {
    > 3 |     ...DoesNotExist
        |        ^^^^^^^^^^^^ Unknown fragment "DoesNotExist".
      4 |   }
`;
