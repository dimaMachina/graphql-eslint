const myQuery = gql`
  query {
    user {
      id
      name
      ... on User {
        name
      }
    }
  }
`;

const myOtherQuery = gql`
  query a {
    user {
      name
    }
  }
`;
