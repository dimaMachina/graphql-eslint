// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`lone-schema-definition > invalid > Invalid #1 1`] = `
#### ⌨️ Code

       1 |         type Query {
       2 |           foo: String
       3 |         }
       4 |
       5 |         schema {
       6 |           query: Query
       7 |         }
       8 |
       9 |         type RootQuery {
      10 |           foo: String
      11 |         }
      12 |
      13 |         schema {
      14 |           query: RootQuery
      15 |         }

#### ❌ Error

      12 |
    > 13 |         schema {
         |         ^^^^^^ Must provide only one schema definition.
      14 |           query: RootQuery
`;
