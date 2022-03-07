// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         scalar DateTimeConnection
       2 |         union DataConnection = Post
       3 |         extend union DataConnection = Comment
       4 |         input CreateUserConnection
       5 |         extend input CreateUserConnection {
       6 |           firstName: String
       7 |         }
       8 |         enum RoleConnection
       9 |         extend enum RoleConnection {
      10 |           ADMIN
      11 |         }
      12 |         interface NodeConnection
      13 |         extend interface NodeConnection {
      14 |           id: ID!
      15 |         }
      16 |         type Post
      17 |         type Comment

❌ Error 1/9

    > 1 |         scalar DateTimeConnection
        |                ^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      2 |         union DataConnection = Post

❌ Error 2/9

      1 |         scalar DateTimeConnection
    > 2 |         union DataConnection = Post
        |               ^^^^^^^^^^^^^^ Connection type must be an Object type.
      3 |         extend union DataConnection = Comment

❌ Error 3/9

      2 |         union DataConnection = Post
    > 3 |         extend union DataConnection = Comment
        |                      ^^^^^^^^^^^^^^ Connection type must be an Object type.
      4 |         input CreateUserConnection

❌ Error 4/9

      3 |         extend union DataConnection = Comment
    > 4 |         input CreateUserConnection
        |               ^^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      5 |         extend input CreateUserConnection {

❌ Error 5/9

      4 |         input CreateUserConnection
    > 5 |         extend input CreateUserConnection {
        |                      ^^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      6 |           firstName: String

❌ Error 6/9

      7 |         }
    > 8 |         enum RoleConnection
        |              ^^^^^^^^^^^^^^ Connection type must be an Object type.
      9 |         extend enum RoleConnection {

❌ Error 7/9

       8 |         enum RoleConnection
    >  9 |         extend enum RoleConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an Object type.
      10 |           ADMIN

❌ Error 8/9

      11 |         }
    > 12 |         interface NodeConnection
         |                   ^^^^^^^^^^^^^^ Connection type must be an Object type.
      13 |         extend interface NodeConnection {

❌ Error 9/9

      12 |         interface NodeConnection
    > 13 |         extend interface NodeConnection {
         |                          ^^^^^^^^^^^^^^ Connection type must be an Object type.
      14 |           id: ID!
`;

exports[` 2`] = `
❌ Error

    > 1 |         type User {
        |              ^^^^ Connection type must have \`Connection\` suffix.
      2 |           edges: UserEdge
      3 |           pageInfo: PageInfo
      4 |         }
`;

exports[` 3`] = `
❌ Error

    > 1 | type UserConnection { pageInfo: PageInfo! }
        |      ^^^^^^^^^^^^^^ Connection type must contain a field \`edges\` that return a list type.
`;

exports[` 4`] = `
❌ Error

    > 1 | type UserConnection { edges: [UserEdge] }
        |      ^^^^^^^^^^^^^^ Connection type must contain a field \`pageInfo\` that return a non-null \`PageInfo\` Object type.
`;

exports[` 5`] = `
Code

      1 |         type AConnection {
      2 |           edges: AEdge
      3 |           pageInfo: PageInfo!
      4 |         }
      5 |         type BConnection {
      6 |           edges: BEdge!
      7 |           pageInfo: PageInfo!
      8 |         }

❌ Error 1/2

      1 |         type AConnection {
    > 2 |           edges: AEdge
        |                  ^^^^^ \`edges\` field must return a list type.
      3 |           pageInfo: PageInfo!

❌ Error 2/2

      5 |         type BConnection {
    > 6 |           edges: BEdge!
        |                  ^^^^^ \`edges\` field must return a list type.
      7 |           pageInfo: PageInfo!
`;

exports[` 6`] = `
Code

       1 |         type AConnection {
       2 |           edges: [AEdge]
       3 |           pageInfo: PageInfo
       4 |         }
       5 |         type BConnection {
       6 |           edges: [BEdge]
       7 |           pageInfo: [PageInfo]
       8 |         }
       9 |         type CConnection {
      10 |           edges: [CEdge]
      11 |           pageInfo: [PageInfo!]
      12 |         }
      13 |         type DConnection {
      14 |           edges: [DEdge]
      15 |           pageInfo: [PageInfo]!
      16 |         }
      17 |         type EConnection {
      18 |           edges: [EEdge]
      19 |           pageInfo: [PageInfo!]!
      20 |         }

❌ Error 1/5

      2 |           edges: [AEdge]
    > 3 |           pageInfo: PageInfo
        |                     ^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      4 |         }

❌ Error 2/5

      6 |           edges: [BEdge]
    > 7 |           pageInfo: [PageInfo]
        |                     ^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      8 |         }

❌ Error 3/5

      10 |           edges: [CEdge]
    > 11 |           pageInfo: [PageInfo!]
         |                     ^^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      12 |         }

❌ Error 4/5

      14 |           edges: [DEdge]
    > 15 |           pageInfo: [PageInfo]!
         |                     ^^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      16 |         }

❌ Error 5/5

      18 |           edges: [EEdge]
    > 19 |           pageInfo: [PageInfo!]!
         |                     ^^^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      20 |         }
`;
