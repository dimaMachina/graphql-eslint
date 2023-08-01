import { rule, RuleOptions } from '../src/rules/match-document-filename';
import { ruleTester } from './test-utils';

ruleTester.run<RuleOptions>('match-document-filename', rule, {
  valid: [
    {
      filename: 'src/me.gql',
      code: '{ me }',
      options: [{ fileExtension: '.gql' }],
    },
    {
      filename: 'src/user-by-id.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'kebab-case', suffix: '.query' } }],
    },
    {
      filename: 'src/createUserQuery.gql',
      code: 'mutation CREATE_USER { user { id } }',
      options: [{ mutation: { style: 'camelCase', suffix: 'Query' } }],
    },
    {
      filename: 'src/NEW_USER.gql',
      code: 'subscription new_user { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE' } }],
    },
    {
      filename: 'src/user_fields.gql',
      code: 'fragment UserFields on User { id }',
      options: [{ fragment: { style: 'snake_case' } }],
    },
    {
      filename: 'src/UserById.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'PascalCase' } }],
    },
    {
      filename: 'src/SAMEAsOperation.gql',
      code: 'query SAMEAsOperation { foo }',
      options: [{ query: 'matchDocumentStyle' }],
    },
  ],
  invalid: [
    {
      filename: 'src/queries/me.graphql',
      code: '{ me }',
      options: [{ fileExtension: '.gql' }],
      errors: [{ message: 'File extension ".graphql" don\'t match extension ".gql"' }],
    },
    {
      filename: 'src/user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'src/userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query' } }],
      errors: [
        { message: 'Unexpected filename "userById.gql". Rename it to "UserById.query.gql"' },
      ],
    },
    {
      filename: 'src/user-fields.gql',
      code: 'fragment UserFields on User { id }',
      options: [{ fragment: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "user-fields.gql". Rename it to "UserFields.gql"' }],
    },
    {
      name: 'compare only first operation name',
      filename: 'src/getUsersQuery.gql',
      code: 'query getUsers { users } mutation createPost { createPost }',
      options: [
        {
          query: { style: 'PascalCase', suffix: '.query' },
          mutation: { style: 'PascalCase', suffix: '.mutation' },
        },
      ],
      errors: [
        { message: 'Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"' },
      ],
    },
    {
      name: 'compare only first operation name if fragment is present',
      filename: 'src/getUsersQuery.gql',
      code: /* GraphQL */ `
        fragment UserFields on User {
          id
        }
        query getUsers {
          users {
            ...UserFields
          }
        }
      `,
      options: [
        {
          query: { style: 'PascalCase', suffix: '.query' },
          fragment: { style: 'PascalCase', suffix: '.fragment' },
        },
      ],
      errors: [
        { message: 'Unexpected filename "getUsersQuery.gql". Rename it to "GetUsers.query.gql"' },
      ],
    },
    {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        mutation addAlertChannel {
          foo
        }
      `,
      options: [{ mutation: { prefix: 'mutation.' } }],
      errors: [
        {
          message:
            'Unexpected filename "add-alert-channel.graphql". Rename it to "mutation.add-alert-channel.graphql"',
        },
      ],
    },
  ],
});
