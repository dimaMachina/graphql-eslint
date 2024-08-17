// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`match-document-filename > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | { me }

#### ⚙️ Options

    {
      "fileExtension": ".gql"
    }

#### ❌ Error

    > 1 | { me }
        | ^ File extension ".graphql" don't match extension ".gql"
`;

exports[`match-document-filename > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"
`;

exports[`match-document-filename > invalid > Invalid #3 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "PascalCase",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "UserById.query.gql"
`;

exports[`match-document-filename > invalid > Invalid #4 1`] = `
#### ⌨️ Code

      1 | fragment UserFields on User { id }

#### ⚙️ Options

    {
      "fragment": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | fragment UserFields on User { id }
        | ^ Unexpected filename "user-fields.gql". Rename it to "UserFields.gql"
`;

exports[`match-document-filename > invalid > Invalid #7 1`] = `
#### ⌨️ Code

      1 |         mutation addAlertChannel {
      2 |           foo
      3 |         }

#### ⚙️ Options

    {
      "mutation": {
        "prefix": "mutation."
      }
    }

#### ❌ Error

    > 1 |         mutation addAlertChannel {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "mutation.add-alert-channel.graphql"
      2 |           foo
`;

exports[`match-document-filename > invalid > compare only first operation name 1`] = `
#### ⌨️ Code

      1 | query getUsers { users } mutation createPost { createPost }

#### ⚙️ Options

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

#### ❌ Error

    > 1 | query getUsers { users } mutation createPost { createPost }
        | ^ Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"
`;

exports[`match-document-filename > invalid > compare only first operation name if fragment is present 1`] = `
#### ⌨️ Code

      1 |         fragment UserFields on User {
      2 |           id
      3 |         }
      4 |         query getUsers {
      5 |           users {
      6 |             ...UserFields
      7 |           }
      8 |         }

#### ⚙️ Options

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

#### ❌ Error

    > 1 |         fragment UserFields on User {
        | ^ Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"
      2 |           id
`;
