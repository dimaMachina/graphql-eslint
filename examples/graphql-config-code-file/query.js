import gql from 'graphql-tag'

const myQuery = gql`
  query {
    user {
      name
    }
  }
`;
