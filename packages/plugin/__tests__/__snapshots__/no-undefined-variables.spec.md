// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-undefined-variables > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | query User {
      2 |   user {
      3 |     id
      4 |     ...UserFields
      5 |   }
      6 | }

#### ❌ Error 1/2

      2 |   user {
    > 3 |     id
        |       ^ Variable "$limit" is not defined by operation "User".
      4 |     ...UserFields

#### ❌ Error 2/2

      2 |   user {
    > 3 |     id
        |       ^ Variable "$offset" is not defined by operation "User".
      4 |     ...UserFields
`;
