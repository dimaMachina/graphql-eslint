// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

      1 |         type User {
    > 2 |           userId: ID!
        |           ^^^^^^ Field "userId" starts with the name of the parent type "User"
      3 |         }
`;

exports[` 2`] = `
Code

      1 |         type User {
      2 |           userId: ID!
      3 |           userName: String!
      4 |         }

❌ Error 1/2

      1 |         type User {
    > 2 |           userId: ID!
        |           ^^^^^^ Field "userId" starts with the name of the parent type "User"
      3 |           userName: String!

❌ Error 2/2

      2 |           userId: ID!
    > 3 |           userName: String!
        |           ^^^^^^^^ Field "userName" starts with the name of the parent type "User"
      4 |         }
`;

exports[` 3`] = `
❌ Error

      1 |         interface Node {
    > 2 |           nodeId: ID!
        |           ^^^^^^ Field "nodeId" starts with the name of the parent type "Node"
      3 |         }
`;
