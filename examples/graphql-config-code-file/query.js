import gql from 'graphql-tag';

const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;
