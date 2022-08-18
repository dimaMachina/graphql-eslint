import { GraphQLRuleTester } from '../src';
import { rule, RuleOptions } from '../src/rules/match-document-filename';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests<RuleOptions>('match-document-filename', rule, {
  valid: [
    {
      filename: 'src/me.gql',
      code: '{ me }',
      options: [{ fileExtension: '.gql' }],
    },
    {
      filename: 'src/me.graphql',
      code: '{ me }',
      options: [{ fileExtension: '.graphql' }],
    },
    {
      filename: 'src/user-by-id.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'kebab-case' } }],
    },
    {
      filename: 'src/user-by-id.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'kebab-case' } }],
    },
    {
      filename: 'src/user-by-id.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'kebab-case' } }],
    },
    {
      filename: 'src/user-by-id.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'kebab-case', suffix: '.query' } }],
    },
    {
      filename: 'src/user-by-id.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'kebab-case', suffix: '.mutation' } }],
    },
    {
      filename: 'src/user-by-id.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'kebab-case', suffix: '.subscription' } }],
    },
    {
      filename: 'query.user-by-id.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'kebab-case', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.user-by-id.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'kebab-case', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.user-by-id.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'kebab-case', prefix: 'subscription.' } }],
    },
    {
      filename: 'query.user-by-id.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'kebab-case', prefix: 'query.', suffix: '.query' } }],
    },
    {
      filename: 'mutation.user-by-id.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'kebab-case', prefix: 'mutation.', suffix: '.mutation' } }],
    },
    {
      filename: 'subscription.user-by-id.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'kebab-case', suffix: '.subscription', prefix: 'subscription.' } }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'UPPER_CASE' } }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE' } }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE' } }],
    },
    {
      filename: 'USER_BY_ID.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'UPPER_CASE', suffix: '.query' } }],
    },
    {
      filename: 'USER_BY_ID.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE', suffix: '.mutation' } }],
    },
    {
      filename: 'USER_BY_ID.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE', suffix: '.subscription' } }],
    },
    {
      filename: 'query.USER_BY_ID.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'UPPER_CASE', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.USER_BY_ID.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.USER_BY_ID.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE', prefix: 'subscription.' } }],
    },
    {
      filename: 'query.USER_BY_ID.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'UPPER_CASE', suffix: '.query', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.USER_BY_ID.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE', suffix: '.mutation', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.USER_BY_ID.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE', suffix: '.subscription', prefix: 'subscription.' } }],
    },
    {
      filename: 'userById.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'camelCase' } }],
    },
    {
      filename: 'userById.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'camelCase' } }],
    },
    {
      filename: 'userById.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'camelCase' } }],
    },
    {
      filename: 'userById.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'camelCase', suffix: '.query' } }],
    },
    {
      filename: 'userById.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'camelCase', suffix: '.mutation' } }],
    },
    {
      filename: 'userById.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'camelCase', suffix: '.subscription' } }],
    },
    {
      filename: 'query.userById.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'camelCase', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.userById.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'camelCase', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.userById.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'camelCase', prefix: 'subscription.' } }],
    },
    {
      filename: 'query.userById.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'camelCase', suffix: '.query', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.userById.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'camelCase', suffix: '.mutation', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.userById.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'camelCase', suffix: '.subscription', prefix: 'subscription.' } }],
    },
    {
      filename: 'user_by_id.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'snake_case' } }],
    },
    {
      filename: 'user_by_id.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'snake_case' } }],
    },
    {
      filename: 'user_by_id.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'snake_case' } }],
    },
    {
      filename: 'user_by_id.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'snake_case', suffix: '.query' } }],
    },
    {
      filename: 'user_by_id.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'snake_case', suffix: '.mutation' } }],
    },
    {
      filename: 'user_by_id.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'snake_case', suffix: '.subscription' } }],
    },
    {
      filename: 'query.user_by_id.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'snake_case', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.user_by_id.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'snake_case', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.user_by_id.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'snake_case', prefix: 'subscription.' } }],
    },
    {
      filename: 'query.user_by_id.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'snake_case', suffix: '.query', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.user_by_id.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'snake_case', suffix: '.mutation', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.user_by_id.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'snake_case', suffix: '.subscription', prefix: 'subscription.' } }],
    },
    {
      filename: 'UserById.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'PascalCase' } }],
    },
    {
      filename: 'UserById.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'PascalCase' } }],
    },
    {
      filename: 'UserById.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'PascalCase' } }],
    },
    {
      filename: 'UserById.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query' } }],
    },
    {
      filename: 'UserById.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'PascalCase', suffix: '.mutation' } }],
    },
    {
      filename: 'UserById.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'PascalCase', suffix: '.subscription' } }],
    },
    {
      filename: 'query.UserById.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'PascalCase', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.UserById.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'PascalCase', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.UserById.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'PascalCase', prefix: 'subscription.' } }],
    },
    {
      filename: 'query.UserById.query.gql',
      code: 'query USER_BY_ID { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.UserById.mutation.gql',
      code: 'mutation USER_BY_ID { user { id } }',
      options: [{ mutation: { style: 'PascalCase', suffix: '.mutation', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.UserById.subscription.gql',
      code: 'subscription USER_BY_ID { user { id } }',
      options: [{ subscription: { style: 'PascalCase', suffix: '.subscription', prefix: 'subscription.' } }],
    },
    {
      filename: 'SAMEAsOperation.gql',
      code: 'query SAMEAsOperation { foo }',
      options: [{ query: { style: 'matchDocumentStyle' } }],
    },
    {
      filename: 'SAMEAsOperation.gql',
      code: 'mutation SAMEAsOperation { foo }',
      options: [{ mutation: { style: 'matchDocumentStyle' } }],
    },
    {
      filename: 'SAMEAsOperation.gql',
      code: 'subscription SAMEAsOperation { foo }',
      options: [{ subscription: { style: 'matchDocumentStyle' } }],
    },
    {
      filename: 'SAMEAsOperation.query.gql',
      code: 'query SAMEAsOperation { foo }',
      options: [{ query: { style: 'matchDocumentStyle', suffix: '.query' } }],
    },
    {
      filename: 'SAMEAsOperation.mutation.gql',
      code: 'mutation SAMEAsOperation { foo }',
      options: [{ mutation: { style: 'matchDocumentStyle', suffix: '.mutation' } }],
    },
    {
      filename: 'SAMEAsOperation.subscription.gql',
      code: 'subscription SAMEAsOperation { foo }',
      options: [{ subscription: { style: 'matchDocumentStyle', suffix: '.subscription' } }],
    },
    {
      filename: 'query.SAMEAsOperation.gql',
      code: 'query SAMEAsOperation { foo }',
      options: [{ query: { style: 'matchDocumentStyle', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.SAMEAsOperation.gql',
      code: 'mutation SAMEAsOperation { foo }',
      options: [{ mutation: { style: 'matchDocumentStyle', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.SAMEAsOperation.gql',
      code: 'subscription SAMEAsOperation { foo }',
      options: [{ subscription: { style: 'matchDocumentStyle', prefix: 'subscription.' } }],
    },
    {
      filename: 'query.SAMEAsOperation.query.gql',
      code: 'query SAMEAsOperation { foo }',
      options: [{ query: { style: 'matchDocumentStyle', suffix: '.query', prefix: 'query.' } }],
    },
    {
      filename: 'mutation.SAMEAsOperation.mutation.gql',
      code: 'mutation SAMEAsOperation { foo }',
      options: [{ mutation: { style: 'matchDocumentStyle', suffix: '.mutation', prefix: 'mutation.' } }],
    },
    {
      filename: 'subscription.SAMEAsOperation.subscription.gql',
      code: 'subscription SAMEAsOperation { foo }',
      options: [{ subscription: { style: 'matchDocumentStyle', suffix: '.subscription', prefix: 'subscription.' } }],
    },
  ],
  invalid: [
    {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        mutation addAlertChannel($input: AddAlertChannelInput!) {
          addAlertChannel(input: $input) {
            ok {
              addedAlertChannel {
                ...AlertSlackChannelFields
                ...AlertWebhookChannelFields
              }
            }
          }
        }
      `,
      options: [{ mutation: { prefix: 'mutation.' } }],
      errors: [
        {
          message: 'Unexpected filename "add-alert-channel.graphql". Rename it to "mutation.add-alert-channel.graphql"',
        },
      ],
    },
    {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        query addAlertChannel($input: AddAlertChannelInput!) {
          addAlertChannel(input: $input) {
            ok {
              addedAlertChannel {
                ...AlertSlackChannelFields
                ...AlertWebhookChannelFields
              }
            }
          }
        }
      `,
      options: [{ query: { prefix: 'query.' } }],
      errors: [
        {
          message: 'Unexpected filename "add-alert-channel.graphql". Rename it to "query.add-alert-channel.graphql"',
        },
      ],
    },
    {
      filename: 'src/userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query' } }],
      errors: [
        { message: 'Unexpected filename "userById.gql". Rename it to "UserById.query.gql"' },
  ]},
      {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        subscription addAlertChannel($input: AddAlertChannelInput!) {
          addAlertChannel(input: $input) {
            ok {
              addedAlertChannel {
                ...AlertSlackChannelFields
                ...AlertWebhookChannelFields
              }
            }
          }
        }
      `,
      options: [{ subscription: { prefix: 'subscription.' } }],
      errors: [
        {
          message:
            'Unexpected filename "add-alert-channel.graphql". Rename it to "subscription.add-alert-channel.graphql"',
        },
      ],
    },
    {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        mutation addAlertChannel($input: AddAlertChannelInput!) {
          addAlertChannel(input: $input) {
            ok {
              addedAlertChannel {
                ...AlertSlackChannelFields
                ...AlertWebhookChannelFields
              }
            }
          }
        }
      `,
      options: [{ mutation: { suffix: '.mutation' } }],
      errors: [
        {
          message: 'Unexpected filename "add-alert-channel.graphql". Rename it to "add-alert-channel.mutation.graphql"',
        },
      ],
    },
    {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        query addAlertChannel($input: AddAlertChannelInput!) {
          addAlertChannel(input: $input) {
            ok {
              addedAlertChannel {
                ...AlertSlackChannelFields
                ...AlertWebhookChannelFields
              }
            }
          }
        }
      `,
      options: [{ query: { suffix: '.query' } }],
      errors: [
        {
          message: 'Unexpected filename "add-alert-channel.graphql". Rename it to "add-alert-channel.query.graphql"',
        },
      ]
    },
    {
      filename: 'add-alert-channel.graphql',
      code: /* GraphQL */ `
        subscription addAlertChannel($input: AddAlertChannelInput!) {
          addAlertChannel(input: $input) {
            ok {
              addedAlertChannel {
                ...AlertSlackChannelFields
                ...AlertWebhookChannelFields
              }
            }
          }
        }
      `,
      options: [{ subscription: { suffix: '.subscription' } }],
      errors: [
        {
          message:
            'Unexpected filename "add-alert-channel.graphql". Rename it to "add-alert-channel.subscription.graphql"',
        },
      ],
    },
    {
      filename: 'user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "user-by-id.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "UserById.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'camelCase' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "userById.gql"' }],
    },
    {
      filename: 'USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "USER_BY_ID.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'kebab-case' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "user-by-id.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'PascalCase' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "UserById.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "USER_BY_ID.gql"' }],
    },
    {
      filename: 'userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case' } }],
      errors: [{ message: 'Unexpected filename "userById.gql". Rename it to "user_by_id.gql"' }],
    },
    {
      filename: 'query.user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.user-by-id.gql". Rename it to "UserById.query.gql"' }],
    },
    {
      filename: 'query.user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'UPPER_CASE', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.user-by-id.gql". Rename it to "USER_BY_ID.query.gql"' }],
    },
    {
      filename: 'query.user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'camelCase', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.user-by-id.gql". Rename it to "userById.query.gql"' }],
    },
    {
      filename: 'query.user-by-id.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.user-by-id.gql". Rename it to "user_by_id.query.gql"' }],
    },
    {
      filename: 'query.UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'kebab-case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.UserById.gql". Rename it to "user-by-id.query.gql"' }],
    },
    {
      filename: 'query.UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'UPPER_CASE', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.UserById.gql". Rename it to "USER_BY_ID.query.gql"' }],
    },
    {
      filename: 'query.UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'camelCase', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.UserById.gql". Rename it to "userById.query.gql"' }],
    },
    {
      filename: 'query.UserById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.UserById.gql". Rename it to "user_by_id.query.gql"' }],
    },
    {
      filename: 'query.USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'kebab-case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.USER_BY_ID.gql". Rename it to "user-by-id.query.gql"' }],
    },
    {
      filename: 'query.USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.USER_BY_ID.gql". Rename it to "UserById.query.gql"' }],
    },
    {
      filename: 'query.USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'camelCase', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.USER_BY_ID.gql". Rename it to "userById.query.gql"' }],
    },
    {
      filename: 'query.USER_BY_ID.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.USER_BY_ID.gql". Rename it to "user_by_id.query.gql"' }],
    },
    {
      filename: 'query.userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'kebab-case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.userById.gql". Rename it to "user-by-id.query.gql"' }],
    },
    {
      filename: 'query.userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'PascalCase', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.userById.gql". Rename it to "UserById.query.gql"' }],
    },
    {
      filename: 'query.userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'UPPER_CASE', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.userById.gql". Rename it to "USER_BY_ID.query.gql"' }],
    },
    {
      filename: 'query.userById.gql',
      code: 'query UserById { user { id } }',
      options: [{ query: { style: 'snake_case', suffix: '.query' } }],
      errors: [{ message: 'Unexpected filename "query.userById.gql". Rename it to "user_by_id.query.gql"' }],
    },
    {
      filename: 'mutation.user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'PascalCase', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.user-by-id.gql". Rename it to "UserById.mutation.gql"' }],
    },
    {
      filename: 'mutation.user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.user-by-id.gql". Rename it to "USER_BY_ID.mutation.gql"' }],
    },
    {
      filename: 'mutation.user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'camelCase', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.user-by-id.gql". Rename it to "userById.mutation.gql"' }],
    },
    {
      filename: 'mutation.user-by-id.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.user-by-id.gql". Rename it to "user_by_id.mutation.gql"' }],
    },
    {
      filename: 'mutation.UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'kebab-case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.UserById.gql". Rename it to "user-by-id.mutation.gql"' }],
    },
    {
      filename: 'mutation.UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.UserById.gql". Rename it to "USER_BY_ID.mutation.gql"' }],
    },
    {
      filename: 'mutation.UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'camelCase', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.UserById.gql". Rename it to "userById.mutation.gql"' }],
    },
    {
      filename: 'mutation.UserById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.UserById.gql". Rename it to "user_by_id.mutation.gql"' }],
    },
    {
      filename: 'mutation.USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'kebab-case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "user-by-id.mutation.gql"' }],
    },
    {
      filename: 'mutation.USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'PascalCase', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "UserById.mutation.gql"' }],
    },
    {
      filename: 'mutation.USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'camelCase', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "userById.mutation.gql"' }],
    },
    {
      filename: 'mutation.USER_BY_ID.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "user_by_id.mutation.gql"' }],
    },
    {
      filename: 'mutation.userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'kebab-case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.userById.gql". Rename it to "user-by-id.mutation.gql"' }],
    },
    {
      filename: 'mutation.userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'PascalCase', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.userById.gql". Rename it to "UserById.mutation.gql"' }],
    },
    {
      filename: 'mutation.userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'UPPER_CASE', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.userById.gql". Rename it to "USER_BY_ID.mutation.gql"' }],
    },
    {
      filename: 'mutation.userById.gql',
      code: 'mutation UserById { user { id } }',
      options: [{ mutation: { style: 'snake_case', suffix: '.mutation' } }],
      errors: [{ message: 'Unexpected filename "mutation.userById.gql". Rename it to "user_by_id.mutation.gql"' }],
    },
    {
      filename: 'subscription.user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'PascalCase', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.user-by-id.gql". Rename it to "UserById.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.user-by-id.gql". Rename it to "USER_BY_ID.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'camelCase', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.user-by-id.gql". Rename it to "userById.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.user-by-id.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.user-by-id.gql". Rename it to "user_by_id.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'kebab-case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.UserById.gql". Rename it to "user-by-id.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.UserById.gql". Rename it to "USER_BY_ID.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'camelCase', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.UserById.gql". Rename it to "userById.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.UserById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.UserById.gql". Rename it to "user_by_id.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'kebab-case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "user-by-id.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'PascalCase', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "UserById.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'camelCase', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "userById.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.USER_BY_ID.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "user_by_id.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'kebab-case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.userById.gql". Rename it to "user-by-id.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'PascalCase', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.userById.gql". Rename it to "UserById.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'UPPER_CASE', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.userById.gql". Rename it to "USER_BY_ID.subscription.gql"' },
      ],
    },
    {
      filename: 'subscription.userById.gql',
      code: 'subscription UserById { user { id } }',
      options: [{ subscription: { style: 'snake_case', suffix: '.subscription' } }],
      errors: [
        { message: 'Unexpected filename "subscription.userById.gql". Rename it to "user_by_id.subscription.gql"' },
      ],
    },
  ],
});
