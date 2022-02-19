// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

      1 |         type User {
      2 |           id: ID!
    > 3 |           firstName: String
        |           ^^^^^^^^^ Field "firstName" is unused
      4 |         }

💡 Suggestion: Remove \`firstName\` field

    1 |         type User {
    2 |           id: ID!
    3 |           
    4 |         }
`;

exports[` 2`] = `
❌ Error

      1 |         type Query {
      2 |           user(id: ID!): User
      3 |         }
      4 |
      5 |         type Mutation {
    > 6 |           deleteUser(id: ID!): User
        |           ^^^^^^^^^^ Field "deleteUser" is unused
      7 |         }

💡 Suggestion: Remove \`deleteUser\` field

    1 |         type Query {
    2 |           user(id: ID!): User
    3 |         }
    4 |
    5 |         
`;
