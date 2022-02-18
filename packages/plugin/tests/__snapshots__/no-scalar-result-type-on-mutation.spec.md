// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

      1 |         type Mutation {
    > 2 |           createUser(a: ID, b: ID!, c: [ID]!, d: [ID!]!): Boolean
        |                                                           ^^^^^^^ Unexpected scalar result type "Boolean"
      3 |         }
`;

exports[` 2`] = `
❌ Error

      1 |         type Mutation
      2 |         extend type Mutation {
    > 3 |           createUser: Boolean!
        |                       ^^^^^^^ Unexpected scalar result type "Boolean"
      4 |         }
`;

exports[` 3`] = `
❌ Error

      1 |         type RootMutation {
    > 2 |           createUser: [Boolean]
        |                        ^^^^^^^ Unexpected scalar result type "Boolean"
      3 |         }
      4 |         schema {
      5 |           mutation: RootMutation
      6 |         }
`;

exports[` 4`] = `
❌ Error

      1 |         type RootMutation
      2 |         extend type RootMutation {
    > 3 |           createUser: [Boolean]!
        |                        ^^^^^^^ Unexpected scalar result type "Boolean"
      4 |         }
      5 |         schema {
      6 |           mutation: RootMutation
      7 |         }
`;

exports[` 5`] = `
Code

      1 |         type Mutation {
      2 |           createUser: User!
      3 |           updateUser: Int
      4 |           deleteUser: [Boolean!]!
      5 |         }

❌ Error 1/2

      2 |           createUser: User!
    > 3 |           updateUser: Int
        |                       ^^^ Unexpected scalar result type "Int"
      4 |           deleteUser: [Boolean!]!

❌ Error 2/2

      3 |           updateUser: Int
    > 4 |           deleteUser: [Boolean!]!
        |                        ^^^^^^^ Unexpected scalar result type "Boolean"
      5 |         }
`;
