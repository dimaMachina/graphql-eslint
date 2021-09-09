const USER_FIELDS = /* GraphQL */ `
  fragment UserFields on User {
    id
    firstName
  }
`;

const ALL_USER_FIELDS = /* GraphQL */ `
  fragment UserFields on User {
    id
    firstName
    lastName
  }
`;
