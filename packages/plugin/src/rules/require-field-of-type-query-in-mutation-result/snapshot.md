// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`require-field-of-type-query-in-mutation-result > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |         type Query
      2 |         type Mutation
      3 |
      4 |         extend type Mutation {
      5 |           createUser: User!
      6 |         }

#### ❌ Error

      4 |         extend type Mutation {
    > 5 |           createUser: User!
        |                       ^^^^ Mutation result type "User" must contain field of type "Query"
      6 |         }
`;

exports[`require-field-of-type-query-in-mutation-result > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 |         type RootQuery
      2 |         type RootMutation {
      3 |           createUser: [User]
      4 |         }
      5 |
      6 |         schema {
      7 |           mutation: RootMutation
      8 |           query: RootQuery
      9 |         }

#### ❌ Error

      2 |         type RootMutation {
    > 3 |           createUser: [User]
        |                        ^^^^ Mutation result type "User" must contain field of type "RootQuery"
      4 |         }
`;

exports[`require-field-of-type-query-in-mutation-result > invalid > Invalid #4 1`] = `
#### ⌨️ Code

       1 |         type RootQuery
       2 |         type RootMutation
       3 |         extend type RootMutation {
       4 |           createUser: [User!]!
       5 |         }
       6 |
       7 |         schema {
       8 |           mutation: RootMutation
       9 |           query: RootQuery
      10 |         }

#### ❌ Error

      3 |         extend type RootMutation {
    > 4 |           createUser: [User!]!
        |                        ^^^^ Mutation result type "User" must contain field of type "RootQuery"
      5 |         }
`;

exports[`require-field-of-type-query-in-mutation-result > invalid > should ignore arguments 1`] = `
#### ⌨️ Code

      1 |         type Query
      2 |         type Mutation {
      3 |           createUser(a: User, b: User!, c: [User], d: [User]!, e: [User!]!): User
      4 |         }

#### ❌ Error

      2 |         type Mutation {
    > 3 |           createUser(a: User, b: User!, c: [User], d: [User]!, e: [User!]!): User
        |                                                                              ^^^^ Mutation result type "User" must contain field of type "Query"
      4 |         }
`;
