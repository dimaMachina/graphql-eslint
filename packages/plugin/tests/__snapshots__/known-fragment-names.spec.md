// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`known-fragment-names > invalid > Invalid #1 1`] = `
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
