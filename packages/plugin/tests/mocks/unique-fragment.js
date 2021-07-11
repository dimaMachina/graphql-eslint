const USER_FIELDS = gql`
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
