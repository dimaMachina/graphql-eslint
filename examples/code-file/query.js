/* eslint-disable no-unused-vars */

const GET_USER = /* GraphQL */ `
  query {
    user {
      name
    }
  }
`;

const GET_ANOTHER_USER = /* GraphQL */ `
  query UserQuery {
    user {
      id
      name
    }
  }
`;
