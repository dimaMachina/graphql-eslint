// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
⚙️ Options

    {
      "fileExtension": ".gql"
    }

❌ Error

    > 1 | { me }
        | ^ File extension ".graphql" don't match extension ".gql"
`;

exports[` 2`] = `
⚙️ Options

    {
      "query": {
        "style": "PascalCase"
      }
    }

❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"
`;

exports[` 3`] = `
⚙️ Options

    {
      "query": {
        "style": "PascalCase",
        "suffix": ".query"
      }
    }

❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "UserById.query.gql"
`;

exports[` 4`] = `
⚙️ Options

    {
      "fragment": {
        "style": "PascalCase"
      }
    }

❌ Error

    > 1 | fragment UserFields on User { id }
        | ^ Unexpected filename "user-fields.gql". Rename it to "UserFields.gql"
`;

exports[` 5`] = `
⚙️ Options

    {
      "query": {
        "style": "PascalCase",
        "suffix": ".query"
      },
      "mutation": {
        "style": "PascalCase",
        "suffix": ".mutation"
      }
    }

❌ Error

    > 1 | query getUsers { users } mutation createPost { createPost }
        | ^ Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"
`;

exports[` 6`] = `
⚙️ Options

    {
      "query": {
        "style": "PascalCase",
        "suffix": ".query"
      },
      "fragment": {
        "style": "PascalCase",
        "suffix": ".fragment"
      }
    }

❌ Error

    > 1 |         fragment UserFields on User {
        | ^ Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"
      2 |           id
      3 |         }
      4 |         query getUsers {
      5 |           users {
      6 |             ...UserFields
      7 |           }
      8 |         }
`;
