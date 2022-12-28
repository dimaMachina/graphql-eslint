import { gql } from 'graphql-tag';

/* GraphQL */ `
  fragment UserFields on User {
    firstname
    lastname
  }
`;

gql`
  {
    user {
      ...UserFields
    }
  }
`;
