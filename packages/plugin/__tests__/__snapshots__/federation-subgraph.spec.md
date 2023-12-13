// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`federation-subgraph > invalid > should validate subgraph 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           t: T
      3 |         }
      4 |
      5 |         type T @key(fields: "f") {
      6 |           f(x: Int): Int
      7 |         }

#### ❌ Error

    > 1 |         type Query {
        | ^^^^^^^^^^^^^^^^^^^^
    > 2 |           t: T
        | ^^^^^^^^^^^^^^
    > 3 |         }
        | ^^^^^^^^^^^^^^
    > 4 |
        | ^^^^^^^^^^^^^^
    > 5 |         type T @key(fields: "f") {
        | ^^^^^^^^^^^^^^
    > 6 |           f(x: Int): Int
        | ^^^^^^^^^^^^^^
    > 7 |         }
        | ^^^^^^^^^^ On type "T", for @key(fields: "f"): field T.f cannot be included because it has arguments (fields with argument are not allowed in @key)
`;
