// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
##### ⚙️ Options

    {
      "fileExtension": ".gql"
    }

##### ❌ Error

    > 1 | { me }
        | ^ File extension ".graphql" don't match extension ".gql"
`;

exports[`Invalid #2 1`] = `
##### ⚙️ Options

    {
      "query": {
        "style": "PascalCase"
      }
    }

##### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #3 1`] = `
##### ⚙️ Options

    {
      "query": {
        "style": "PascalCase",
        "suffix": ".query"
      }
    }

##### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "UserById.query.gql"
`;

exports[`Invalid #4 1`] = `
##### ⚙️ Options

    {
      "fragment": {
        "style": "PascalCase"
      }
    }

##### ❌ Error

    > 1 | fragment UserFields on User { id }
        | ^ Unexpected filename "user-fields.gql". Rename it to "UserFields.gql"
`;

exports[`compare only first operation name 1`] = `
##### ⚙️ Options

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

##### ❌ Error

    > 1 | query getUsers { users } mutation createPost { createPost }
        | ^ Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"
`;

exports[`compare only first operation name if fragment is present 1`] = `
##### ⚙️ Options

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

##### ❌ Error

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
