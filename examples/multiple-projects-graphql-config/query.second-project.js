import { custom } from 'custom-graphql-tag';

/* MyGraphQL */ `
  fragment UserFields on AnotherUser {
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
