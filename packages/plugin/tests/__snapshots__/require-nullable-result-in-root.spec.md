// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`should fail when query contains non-nullable fields in root 1`] = `
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
        |                 ^^^^ Non-null types are not allowed in root
      3 |         }

#### 💡 Suggestion: Make \`user\` nullable

    1 |         type Query {
    2 |           user: User
    3 |         }
    4 |         type User {
    5 |           id: ID!
    6 |         }
`;
