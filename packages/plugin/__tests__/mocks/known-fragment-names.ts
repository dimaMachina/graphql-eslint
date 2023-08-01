const USER_FIELDS = /* GraphQL */ `
  fragment UserFields on User {
    id
  }
`;

const GET_USER = /* GraphQL */ `
  query User {
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
