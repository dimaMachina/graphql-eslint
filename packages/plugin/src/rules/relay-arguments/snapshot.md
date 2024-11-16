// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`relay-arguments > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           posts: PostConnection
      3 |           comments(
      4 |             after: [String!]!
      5 |             first: Float
      6 |             before: Query
      7 |             last: [PostConnection]
      8 |           ): PostConnection
      9 |         }

#### ❌ Error 1/5

      1 |         type User {
    > 2 |           posts: PostConnection
        |           ^^^^^ A field that returns a Connection type must include forward pagination arguments (\`first\` and \`after\`), backward pagination arguments (\`last\` and \`before\`), or both.
      3 |           comments(

#### ❌ Error 2/5

      3 |           comments(
    > 4 |             after: [String!]!
        |             ^^^^^ Argument \`after\` must return String or Scalar.
      5 |             first: Float

#### ❌ Error 3/5

      4 |             after: [String!]!
    > 5 |             first: Float
        |             ^^^^^ Argument \`first\` must return Int.
      6 |             before: Query

#### ❌ Error 4/5

      5 |             first: Float
    > 6 |             before: Query
        |             ^^^^^^ Argument \`before\` must return String or Scalar.
      7 |             last: [PostConnection]

#### ❌ Error 5/5

      6 |             before: Query
    > 7 |             last: [PostConnection]
        |             ^^^^ Argument \`last\` must return Int.
      8 |           ): PostConnection
`;

exports[`relay-arguments > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           posts(after: String, first: Int): PostConnection
      3 |         }

#### ❌ Error 1/2

      1 |         type User {
    > 2 |           posts(after: String, first: Int): PostConnection
        |           ^^^^^ Field \`posts\` must contain an argument \`last\`, that return Int.
      3 |         }

#### ❌ Error 2/2

      1 |         type User {
    > 2 |           posts(after: String, first: Int): PostConnection
        |           ^^^^^ Field \`posts\` must contain an argument \`before\`, that return String or Scalar.
      3 |         }
`;

exports[`relay-arguments > invalid > should report about 2nd required argument if 1st was provided 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           posts(after: String, first: Int, before: Float): PostConnection
      3 |         }

#### ⚙️ Options

    {
      "includeBoth": false
    }

#### ❌ Error

      1 |         type User {
    > 2 |           posts(after: String, first: Int, before: Float): PostConnection
        |           ^^^^^ Field \`posts\` must contain an argument \`last\`, that return Int.
      3 |         }
`;
