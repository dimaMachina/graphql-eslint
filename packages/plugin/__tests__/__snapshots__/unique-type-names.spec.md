// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`unique-type-names > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           foo: String
      3 |         }
      4 |
      5 |         type Query {
      6 |           bar: Boolean
      7 |         }

#### ❌ Error

    > 1 |         type Query {
        |              ^^^^^ There can be only one type named "Query".
      2 |           foo: String
`;
