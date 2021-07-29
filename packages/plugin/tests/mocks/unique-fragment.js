// eslint-disable-next-line no-undef
const USER_FIELDS = gql`
  fragment UserFields on User {
    id
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_USER = /* GraphQL */ `
  query User {
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
