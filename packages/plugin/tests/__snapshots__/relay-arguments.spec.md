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
        |                    ^^^^^ Argument \`after\` must return non-null String or Scalar.
      4 |         }

##### ❌ Error 3/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                                       ^^^^^ Argument \`first\` must return non-null Int.
      4 |         }

##### ❌ Error 4/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                                                     ^^^^^^ Argument \`before\` must return non-null String or Scalar.
      4 |         }

##### ❌ Error 5/5

      2 |           posts: PostConnection
    > 3 |           comments(after: [String!]!, first: Float, before: Query, last: [PostConnection]): PostConnection
        |                                                                    ^^^^ Argument \`last\` must return non-null Int.
      4 |         }
`;
