// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           user: User!
      3 |         }
      4 |         type User {
      5 |           id: ID!
      6 |         }

#### ❌ Error

      1 |         type Query {
    > 2 |           user: User!
        |                 ^^^^ Unexpected non-null result type "User" in type "Query"
      3 |         }

#### 💡 Suggestion: Make type "User" nullable

    1 |         type Query {
    2 |           user: User
    3 |         }
    4 |         type User {
    5 |           id: ID!
    6 |         }
`;

exports[`should work with extend query 1`] = `
#### ⌨️ Code

       1 |         type MyMutation
       2 |         extend type MyMutation {
       3 |           user: User!
       4 |         }
       5 |         interface User {
       6 |           id: ID!
       7 |         }
       8 |         schema {
       9 |           mutation: MyMutation
      10 |         }

#### ❌ Error

      2 |         extend type MyMutation {
    > 3 |           user: User!
        |                 ^^^^ Unexpected non-null result interface "User" in type "MyMutation"
      4 |         }

#### 💡 Suggestion: Make interface "User" nullable

     1 |         type MyMutation
     2 |         extend type MyMutation {
     3 |           user: User
     4 |         }
     5 |         interface User {
     6 |           id: ID!
     7 |         }
     8 |         schema {
     9 |           mutation: MyMutation
    10 |         }
`;
