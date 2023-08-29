// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`relay-page-info > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | scalar PageInfo

#### ❌ Error

    > 1 | scalar PageInfo
        |        ^^^^^^^^ \`PageInfo\` must be an Object type.
`;

exports[`relay-page-info > invalid > when \`PageInfo\` is missing 1`] = `
#### ⌨️ Code

      1 | type Query

#### ❌ Error

    > 1 | type Query
        | ^ The server must provide a \`PageInfo\` object.
`;

exports[`relay-page-info > invalid > when enum 1`] = `
#### ⌨️ Code

      1 |         enum PageInfo
      2 |         extend enum PageInfo {
      3 |           hasPreviousPage
      4 |           hasNextPage
      5 |           startCursor
      6 |           endCursor
      7 |         }

#### ❌ Error 1/2

    > 1 |         enum PageInfo
        |              ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend enum PageInfo {

#### ❌ Error 2/2

      1 |         enum PageInfo
    > 2 |         extend enum PageInfo {
        |                     ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |           hasPreviousPage
`;

exports[`relay-page-info > invalid > when extend type 1`] = `
#### ⌨️ Code

      1 |         type PageInfo
      2 |         extend type PageInfo {
      3 |           hasPreviousPage: Boolean!
      4 |           hasNextPage: Boolean!
      5 |           startCursor: String
      6 |           endCursor: String
      7 |         }

#### ❌ Error 1/4

    > 1 |         type PageInfo
        |              ^^^^^^^^ \`PageInfo\` must contain a field \`hasPreviousPage\`, that return non-null Boolean.
      2 |         extend type PageInfo {

#### ❌ Error 2/4

    > 1 |         type PageInfo
        |              ^^^^^^^^ \`PageInfo\` must contain a field \`hasNextPage\`, that return non-null Boolean.
      2 |         extend type PageInfo {

#### ❌ Error 3/4

    > 1 |         type PageInfo
        |              ^^^^^^^^ \`PageInfo\` must contain a field \`startCursor\`, that return either String or Scalar, which can be null if there are no results.
      2 |         extend type PageInfo {

#### ❌ Error 4/4

    > 1 |         type PageInfo
        |              ^^^^^^^^ \`PageInfo\` must contain a field \`endCursor\`, that return either String or Scalar, which can be null if there are no results.
      2 |         extend type PageInfo {
`;

exports[`relay-page-info > invalid > when fields is missing or incorrect return type 1`] = `
#### ⌨️ Code

      1 |         type PageInfo {
      2 |           hasPreviousPage: [Boolean!]!
      3 |           startCursor: [String]
      4 |         }

#### ❌ Error 1/4

    > 1 |         type PageInfo {
        |              ^^^^^^^^ \`PageInfo\` must contain a field \`hasNextPage\`, that return non-null Boolean.
      2 |           hasPreviousPage: [Boolean!]!

#### ❌ Error 2/4

    > 1 |         type PageInfo {
        |              ^^^^^^^^ \`PageInfo\` must contain a field \`endCursor\`, that return either String or Scalar, which can be null if there are no results.
      2 |           hasPreviousPage: [Boolean!]!

#### ❌ Error 3/4

      1 |         type PageInfo {
    > 2 |           hasPreviousPage: [Boolean!]!
        |           ^^^^^^^^^^^^^^^ Field \`hasPreviousPage\` must return non-null Boolean.
      3 |           startCursor: [String]

#### ❌ Error 4/4

      2 |           hasPreviousPage: [Boolean!]!
    > 3 |           startCursor: [String]
        |           ^^^^^^^^^^^ Field \`startCursor\` must return either String or Scalar, which can be null if there are no results.
      4 |         }
`;

exports[`relay-page-info > invalid > when input 1`] = `
#### ⌨️ Code

      1 |         input PageInfo
      2 |         extend input PageInfo {
      3 |           hasPreviousPage: Boolean!
      4 |           hasNextPage: Boolean!
      5 |           startCursor: String
      6 |           endCursor: String
      7 |         }

#### ❌ Error 1/2

    > 1 |         input PageInfo
        |               ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend input PageInfo {

#### ❌ Error 2/2

      1 |         input PageInfo
    > 2 |         extend input PageInfo {
        |                      ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |           hasPreviousPage: Boolean!
`;

exports[`relay-page-info > invalid > when interface 1`] = `
#### ⌨️ Code

      1 |         interface PageInfo
      2 |         extend interface PageInfo {
      3 |           hasPreviousPage: Boolean!
      4 |           hasNextPage: Boolean!
      5 |           startCursor: String
      6 |           endCursor: String
      7 |         }

#### ❌ Error 1/2

    > 1 |         interface PageInfo
        |                   ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend interface PageInfo {

#### ❌ Error 2/2

      1 |         interface PageInfo
    > 2 |         extend interface PageInfo {
        |                          ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |           hasPreviousPage: Boolean!
`;

exports[`relay-page-info > invalid > when union 1`] = `
#### ⌨️ Code

      1 |         union PageInfo = UserConnection | Post
      2 |         extend union PageInfo = Comment
      3 |         type UserConnection {
      4 |           edges: [UserEdge]
      5 |           pageInfo: PageInfo!
      6 |         }
      7 |         type Post
      8 |         type Comment
      9 |         type UserEdge

#### ❌ Error 1/2

    > 1 |         union PageInfo = UserConnection | Post
        |               ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend union PageInfo = Comment

#### ❌ Error 2/2

      1 |         union PageInfo = UserConnection | Post
    > 2 |         extend union PageInfo = Comment
        |                      ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |         type UserConnection {
`;
