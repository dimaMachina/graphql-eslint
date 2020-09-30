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

const myOther2Query = /* GraphQL */ `





  query {
    user {
      name
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
