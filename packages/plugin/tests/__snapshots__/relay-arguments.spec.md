// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
##### ⌨️ Code

      1 |         type User {
      2 |           posts: PostConnection
      3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
      4 |         }

##### ❌ Error 1/5

      1 |         type User {
    > 2 |           posts: PostConnection
        |           ^^^^^ A field that returns a Connection type must include forward pagination arguments (\`first\` and \`after\`), backward pagination arguments (\`last\` and \`before\`), or both.
      3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection

##### ❌ Error 2/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                    ^^^^^ Argument \`after\` must return String or Scalar.
      4 |         }

##### ❌ Error 3/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                                       ^^^^^ Argument \`first\` must return Int.
      4 |         }

##### ❌ Error 4/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                                                     ^^^^^^ Argument \`before\` must return String or Scalar.
      4 |         }

##### ❌ Error 5/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                                                                    ^^^^ Argument \`last\` must return Int.
      4 |         }
`;

exports[`Invalid #2 1`] = `
##### ⌨️ Code

      1 |         type User {
      2 |           posts(after: String, first: Int): PostConnection
      3 |         }

##### ❌ Error 1/2

      1 |         type User {
    > 2 |           posts(after: String, first: Int): PostConnection
        |           ^^^^^ Field \`posts\` must contain an argument \`last\`, that return Int.
      3 |         }

##### ❌ Error 2/2

      1 |         type User {
    > 2 |           posts(after: String, first: Int): PostConnection
        |           ^^^^^ Field \`posts\` must contain an argument \`before\`, that return String or Scalar.
      3 |         }
`;
