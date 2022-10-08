import { custom } from 'custom-graphql-tag';

/* MyGraphQL */ `
  fragment UserFields on User {
    firstName
    lastName
  }
`;

custom`
  {
    users {
      ...UserFields
    }
  }
`;
