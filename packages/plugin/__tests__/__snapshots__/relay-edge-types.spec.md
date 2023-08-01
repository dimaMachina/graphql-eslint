// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`relay-edge-types > invalid > Edge type must be Object type 1`] = `
#### ⌨️ Code

       1 |         type PageInfo
       2 |         type BConnection
       3 |         type DConnection
       4 |         scalar AEdge
       5 |         union BEdge = PageInfo
       6 |         enum CEdge
       7 |         interface DEdge
       8 |         type AConnection {
       9 |           edges: [AEdge]
      10 |           pageInfo: PageInfo!
      11 |         }
      12 |         extend type BConnection {
      13 |           edges: [BEdge!]
      14 |           pageInfo: PageInfo!
      15 |         }
      16 |         type CConnection {
      17 |           edges: [CEdge]!
      18 |           pageInfo: PageInfo!
      19 |         }
      20 |         extend type DConnection {
      21 |           edges: [DEdge!]!
      22 |           pageInfo: PageInfo!
      23 |         }

#### ⚙️ Options

    {
      "shouldImplementNode": false,
      "listTypeCanWrapOnlyEdgeType": false,
      "withEdgeSuffix": true
    }

#### ❌ Error 1/4

       8 |         type AConnection {
    >  9 |           edges: [AEdge]
         |                   ^^^^^ Edge type must be an Object type.
      10 |           pageInfo: PageInfo!

#### ❌ Error 2/4

      12 |         extend type BConnection {
    > 13 |           edges: [BEdge!]
         |                   ^^^^^ Edge type must be an Object type.
      14 |           pageInfo: PageInfo!

#### ❌ Error 3/4

      16 |         type CConnection {
    > 17 |           edges: [CEdge]!
         |                   ^^^^^ Edge type must be an Object type.
      18 |           pageInfo: PageInfo!

#### ❌ Error 4/4

      20 |         extend type DConnection {
    > 21 |           edges: [DEdge!]!
         |                   ^^^^^ Edge type must be an Object type.
      22 |           pageInfo: PageInfo!
`;

exports[`relay-edge-types > invalid > list type 1`] = `
#### ⌨️ Code

       1 |         type AEdge {
       2 |           node: Int!
       3 |           cursor: String!
       4 |         }
       5 |         type AConnection {
       6 |           edges: [AEdge]
       7 |         }
       8 |         type User {
       9 |           comments: [Int]
      10 |           likes: [Int!]
      11 |           messages: [Int]!
      12 |           posts: [Int!]!
      13 |         }

#### ⚙️ Options

    {
      "listTypeCanWrapOnlyEdgeType": true,
      "withEdgeSuffix": true,
      "shouldImplementNode": true
    }

#### ❌ Error 1/4

       8 |         type User {
    >  9 |           comments: [Int]
         |                     ^^^^ A list type should only wrap an edge type.
      10 |           likes: [Int!]

#### ❌ Error 2/4

       9 |           comments: [Int]
    > 10 |           likes: [Int!]
         |                  ^^^^^ A list type should only wrap an edge type.
      11 |           messages: [Int]!

#### ❌ Error 3/4

      10 |           likes: [Int!]
    > 11 |           messages: [Int]!
         |                     ^^^^^ A list type should only wrap an edge type.
      12 |           posts: [Int!]!

#### ❌ Error 4/4

      11 |           messages: [Int]!
    > 12 |           posts: [Int!]!
         |                  ^^^^^^ A list type should only wrap an edge type.
      13 |         }
`;

exports[`relay-edge-types > invalid > should implements Node 1`] = `
#### ⌨️ Code

       1 |         type User {
       2 |           id: ID!
       3 |         }
       4 |         type AEdge {
       5 |           node: User!
       6 |           cursor: String!
       7 |         }
       8 |         type AConnection {
       9 |           edges: [AEdge]
      10 |         }

#### ⚙️ Options

    {
      "shouldImplementNode": true,
      "withEdgeSuffix": true,
      "listTypeCanWrapOnlyEdgeType": true
    }

#### ❌ Error

      3 |         }
    > 4 |         type AEdge {
        |              ^^^^^ Edge type's field \`node\` must implement \`Node\` interface.
      5 |           node: User!
`;

exports[`relay-edge-types > invalid > should report cursor when list is used 1`] = `
#### ⌨️ Code

      1 |         type PageInfo
      2 |         type AEdge {
      3 |           node: [PageInfo!]!
      4 |           cursor: [PageInfo!]!
      5 |         }
      6 |         type AConnection {
      7 |           edges: [AEdge]
      8 |           pageInfo: PageInfo!
      9 |         }

#### ⚙️ Options

    {
      "shouldImplementNode": false,
      "listTypeCanWrapOnlyEdgeType": false,
      "withEdgeSuffix": true
    }

#### ❌ Error 1/2

      2 |         type AEdge {
    > 3 |           node: [PageInfo!]!
        |           ^^^^ Field \`node\` must return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types.
      4 |           cursor: [PageInfo!]!

#### ❌ Error 2/2

      3 |           node: [PageInfo!]!
    > 4 |           cursor: [PageInfo!]!
        |           ^^^^^^ Field \`cursor\` must return either a String, Scalar, or a non-null wrapper wrapper around one of those types.
      5 |         }
`;

exports[`relay-edge-types > invalid > should report when fields is missing 1`] = `
#### ⌨️ Code

      1 |         type PageInfo
      2 |         type AEdge
      3 |         type AConnection {
      4 |           edges: [AEdge]
      5 |           pageInfo: PageInfo!
      6 |         }

#### ❌ Error 1/2

      1 |         type PageInfo
    > 2 |         type AEdge
        |              ^^^^^ Edge type must contain a field \`node\` that return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types.
      3 |         type AConnection {

#### ❌ Error 2/2

      1 |         type PageInfo
    > 2 |         type AEdge
        |              ^^^^^ Edge type must contain a field \`cursor\` that return either a String, Scalar, or a non-null wrapper wrapper around one of those types.
      3 |         type AConnection {
`;

exports[`relay-edge-types > invalid > should report when without Edge suffix 1`] = `
#### ⌨️ Code

      1 |         scalar Email
      2 |         type Aedge {
      3 |           node: Email!
      4 |           cursor: Email!
      5 |         }
      6 |         type AConnection {
      7 |           edges: [Aedge]
      8 |         }

#### ⚙️ Options

    {
      "withEdgeSuffix": true,
      "shouldImplementNode": true,
      "listTypeCanWrapOnlyEdgeType": true
    }

#### ❌ Error

      1 |         scalar Email
    > 2 |         type Aedge {
        |              ^^^^^ Edge type must have "Edge" suffix.
      3 |           node: Email!
`;
