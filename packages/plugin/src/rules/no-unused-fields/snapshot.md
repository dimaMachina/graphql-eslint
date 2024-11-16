// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`no-unused-fields > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           id: ID!
      3 |           firstName: String
      4 |         }

#### ❌ Error

      2 |           id: ID!
    > 3 |           firstName: String
        |           ^^^^^^^^^ Field "firstName" is unused
      4 |         }

#### 💡 Suggestion: Remove \`firstName\` field

    1 |         type User {
    2 |           id: ID!
    3 |           
    4 |         }
`;

exports[`no-unused-fields > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 |         type Query {
      2 |           user(id: ID!): User
      3 |         }
      4 |
      5 |         type Mutation {
      6 |           deleteUser(id: ID!): User
      7 |         }

#### ❌ Error

      5 |         type Mutation {
    > 6 |           deleteUser(id: ID!): User
        |           ^^^^^^^^^^ Field "deleteUser" is unused
      7 |         }

#### 💡 Suggestion: Remove \`deleteUser\` field

    1 |         type Query {
    2 |           user(id: ID!): User
    3 |         }
    4 |
    5 |         
`;
