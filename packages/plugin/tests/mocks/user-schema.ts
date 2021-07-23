const SCHEMA = /* GraphQL */ `
  type User {
    id: ID!
    firstName: String!
  }

  type Post {
    id: ID!
    user: User!
  }

  type Query {
    user: User
    post: Post
  }
`;
