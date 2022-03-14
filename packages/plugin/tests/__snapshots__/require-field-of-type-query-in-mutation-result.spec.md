// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #2 1`] = `
##### ❌ Error

      1 |         type Query
      2 |         type Mutation
      3 |
      4 |         extend type Mutation {
    > 5 |           createUser: User!
        |                       ^^^^ Mutation result type "User" must contain field of type "Query"
      6 |         }
`;

exports[`Invalid #3 1`] = `
##### ❌ Error

      1 |         type RootQuery
      2 |         type RootMutation {
    > 3 |           createUser: [User]
        |                        ^^^^ Mutation result type "User" must contain field of type "RootQuery"
      4 |         }
      5 |
      6 |         schema {
      7 |           mutation: RootMutation
      8 |           query: RootQuery
      9 |         }
`;

exports[`Invalid #4 1`] = `
##### ❌ Error

       1 |         type RootQuery
       2 |         type RootMutation
       3 |         extend type RootMutation {
    >  4 |           createUser: [User!]!
         |                        ^^^^ Mutation result type "User" must contain field of type "RootQuery"
       5 |         }
       6 |
       7 |         schema {
       8 |           mutation: RootMutation
       9 |           query: RootQuery
      10 |         }
`;

exports[`should ignore arguments 1`] = `
##### ❌ Error

      1 |         type Query
      2 |         type Mutation {
    > 3 |           createUser(a: User, b: User!, c: [User], d: [User]!, e: [User!]!): User
        |                                                                              ^^^^ Mutation result type "User" must contain field of type "Query"
      4 |         }
`;
