const gql = require('graphql-tag');

const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;
