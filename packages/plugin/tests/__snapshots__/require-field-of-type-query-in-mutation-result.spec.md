// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

      1 |         type Query
      2 |         type Mutation {
    > 3 |           createUser(a: User, b: User!, c: [User], d: [User]!, e: [User!]!): User
        |                                                                              ^^^^ Mutation result type "User" must contain field of type "Query"
      4 |         }
`;

exports[` 2`] = `
❌ Error

      1 |         type Query
      2 |         type Mutation
      3 |         extend type Mutation {
    > 4 |           createUser: User!
        |                       ^^^^ Mutation result type "User" must contain field of type "Query"
      5 |         }
`;

exports[` 3`] = `
❌ Error

      1 |         type RootQuery
      2 |         type RootMutation {
    > 3 |           createUser: [User]
        |                        ^^^^ Mutation result type "User" must contain field of type "RootQuery"
      4 |         }
      5 |         schema {
      6 |           mutation: RootMutation
      7 |           query: RootQuery
      8 |         }
`;

exports[` 4`] = `
❌ Error

      1 |         type RootQuery
      2 |         type RootMutation
      3 |         extend type RootMutation {
    > 4 |           createUser: [User!]!
        |                        ^^^^ Mutation result type "User" must contain field of type "RootQuery"
      5 |         }
      6 |         schema {
      7 |           mutation: RootMutation
      8 |           query: RootQuery
      9 |         }
`;
