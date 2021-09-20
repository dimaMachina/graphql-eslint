const gql = require('graphql-tag');

// eslint-disable-next-line no-unused-vars
const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;
