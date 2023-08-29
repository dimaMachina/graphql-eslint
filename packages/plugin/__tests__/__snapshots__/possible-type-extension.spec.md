// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`possible-type-extension > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 |         extend type OtherUser {
      2 |           name: String
      3 |         }

#### ❌ Error

    > 1 |         extend type OtherUser {
        |                     ^^^^^^^^^ Cannot extend type "OtherUser" because it is not defined.
      2 |           name: String
`;
