// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
#### ⌨️ Code

       1 |         mutation addAlertChannel($input: AddAlertChannelInput!) {
       2 |           addAlertChannel(input: $input) {
       3 |             ok {
       4 |               addedAlertChannel {
       5 |                 ...AlertSlackChannelFields
       6 |                 ...AlertWebhookChannelFields
       7 |               }
       8 |             }
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "mutation": {
        "prefix": "mutation."
      }
    }

#### ❌ Error

    > 1 |         mutation addAlertChannel($input: AddAlertChannelInput!) {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "mutation.add-alert-channel.graphql"
      2 |           addAlertChannel(input: $input) {
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

       1 |         query addAlertChannel($input: AddAlertChannelInput!) {
       2 |           addAlertChannel(input: $input) {
       3 |             ok {
       4 |               addedAlertChannel {
       5 |                 ...AlertSlackChannelFields
       6 |                 ...AlertWebhookChannelFields
       7 |               }
       8 |             }
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "query": {
        "prefix": "query."
      }
    }

#### ❌ Error

    > 1 |         query addAlertChannel($input: AddAlertChannelInput!) {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "query.add-alert-channel.graphql"
      2 |           addAlertChannel(input: $input) {
`;

exports[`Invalid #3 1`] = `
#### ⌨️ Code

       1 |         subscription addAlertChannel($input: AddAlertChannelInput!) {
       2 |           addAlertChannel(input: $input) {
       3 |             ok {
       4 |               addedAlertChannel {
       5 |                 ...AlertSlackChannelFields
       6 |                 ...AlertWebhookChannelFields
       7 |               }
       8 |             }
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "subscription": {
        "prefix": "subscription."
      }
    }

#### ❌ Error

    > 1 |         subscription addAlertChannel($input: AddAlertChannelInput!) {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "subscription.add-alert-channel.graphql"
      2 |           addAlertChannel(input: $input) {
`;

exports[`Invalid #4 1`] = `
#### ⌨️ Code

       1 |         mutation addAlertChannel($input: AddAlertChannelInput!) {
       2 |           addAlertChannel(input: $input) {
       3 |             ok {
       4 |               addedAlertChannel {
       5 |                 ...AlertSlackChannelFields
       6 |                 ...AlertWebhookChannelFields
       7 |               }
       8 |             }
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "mutation": {
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 |         mutation addAlertChannel($input: AddAlertChannelInput!) {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "add-alert-channel.mutation.graphql"
      2 |           addAlertChannel(input: $input) {
`;

exports[`Invalid #5 1`] = `
#### ⌨️ Code

       1 |         query addAlertChannel($input: AddAlertChannelInput!) {
       2 |           addAlertChannel(input: $input) {
       3 |             ok {
       4 |               addedAlertChannel {
       5 |                 ...AlertSlackChannelFields
       6 |                 ...AlertWebhookChannelFields
       7 |               }
       8 |             }
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "query": {
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 |         query addAlertChannel($input: AddAlertChannelInput!) {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "add-alert-channel.query.graphql"
      2 |           addAlertChannel(input: $input) {
`;

exports[`Invalid #6 1`] = `
#### ⌨️ Code

       1 |         subscription addAlertChannel($input: AddAlertChannelInput!) {
       2 |           addAlertChannel(input: $input) {
       3 |             ok {
       4 |               addedAlertChannel {
       5 |                 ...AlertSlackChannelFields
       6 |                 ...AlertWebhookChannelFields
       7 |               }
       8 |             }
       9 |           }
      10 |         }

#### ⚙️ Options

    {
      "subscription": {
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 |         subscription addAlertChannel($input: AddAlertChannelInput!) {
        | ^ Unexpected filename "add-alert-channel.graphql". Rename it to "add-alert-channel.subscription.graphql"
      2 |           addAlertChannel(input: $input) {
`;

exports[`Invalid #7 1`] = `
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

exports[`Invalid #8 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #9 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "userById.gql"
`;

exports[`Invalid #10 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #11 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #12 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #13 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "userById.gql"
`;

exports[`Invalid #14 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #15 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #16 1`] = `
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
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #17 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "userById.gql"
`;

exports[`Invalid #18 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #19 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #20 1`] = `
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
        | ^ Unexpected filename "userById.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #21 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #22 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #23 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #24 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #25 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "userById.gql"
`;

exports[`Invalid #26 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #27 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #28 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #29 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "userById.gql"
`;

exports[`Invalid #30 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #31 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #32 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #33 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "userById.gql"
`;

exports[`Invalid #34 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #35 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #36 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #37 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #38 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #39 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #40 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #41 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "userById.gql"
`;

exports[`Invalid #42 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "user-by-id.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #43 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #44 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #45 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "userById.gql"
`;

exports[`Invalid #46 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "UserById.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #47 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #48 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #49 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "camelCase"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "userById.gql"
`;

exports[`Invalid #50 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "USER_BY_ID.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #51 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "kebab-case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "user-by-id.gql"
`;

exports[`Invalid #52 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "PascalCase"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "UserById.gql"
`;

exports[`Invalid #53 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "UPPER_CASE"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "USER_BY_ID.gql"
`;

exports[`Invalid #54 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "userById.gql". Rename it to "user_by_id.gql"
`;

exports[`Invalid #55 1`] = `
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
        | ^ Unexpected filename "query.user-by-id.gql". Rename it to "UserById.query.gql"
`;

exports[`Invalid #56 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "UPPER_CASE",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.user-by-id.gql". Rename it to "USER_BY_ID.query.gql"
`;

exports[`Invalid #57 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "camelCase",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.user-by-id.gql". Rename it to "userById.query.gql"
`;

exports[`Invalid #58 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.user-by-id.gql". Rename it to "user_by_id.query.gql"
`;

exports[`Invalid #59 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "kebab-case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.UserById.gql". Rename it to "user-by-id.query.gql"
`;

exports[`Invalid #60 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "UPPER_CASE",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.UserById.gql". Rename it to "USER_BY_ID.query.gql"
`;

exports[`Invalid #61 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "camelCase",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.UserById.gql". Rename it to "userById.query.gql"
`;

exports[`Invalid #62 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.UserById.gql". Rename it to "user_by_id.query.gql"
`;

exports[`Invalid #63 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "kebab-case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.USER_BY_ID.gql". Rename it to "user-by-id.query.gql"
`;

exports[`Invalid #64 1`] = `
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
        | ^ Unexpected filename "query.USER_BY_ID.gql". Rename it to "UserById.query.gql"
`;

exports[`Invalid #65 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "camelCase",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.USER_BY_ID.gql". Rename it to "userById.query.gql"
`;

exports[`Invalid #66 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.USER_BY_ID.gql". Rename it to "user_by_id.query.gql"
`;

exports[`Invalid #67 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "kebab-case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.userById.gql". Rename it to "user-by-id.query.gql"
`;

exports[`Invalid #68 1`] = `
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
        | ^ Unexpected filename "query.userById.gql". Rename it to "UserById.query.gql"
`;

exports[`Invalid #69 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "UPPER_CASE",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.userById.gql". Rename it to "USER_BY_ID.query.gql"
`;

exports[`Invalid #70 1`] = `
#### ⌨️ Code

      1 | query UserById { user { id } }

#### ⚙️ Options

    {
      "query": {
        "style": "snake_case",
        "suffix": ".query"
      }
    }

#### ❌ Error

    > 1 | query UserById { user { id } }
        | ^ Unexpected filename "query.userById.gql". Rename it to "user_by_id.query.gql"
`;

exports[`Invalid #71 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "PascalCase",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.user-by-id.gql". Rename it to "UserById.mutation.gql"
`;

exports[`Invalid #72 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "UPPER_CASE",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.user-by-id.gql". Rename it to "USER_BY_ID.mutation.gql"
`;

exports[`Invalid #73 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "camelCase",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.user-by-id.gql". Rename it to "userById.mutation.gql"
`;

exports[`Invalid #74 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.user-by-id.gql". Rename it to "user_by_id.mutation.gql"
`;

exports[`Invalid #75 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "kebab-case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.UserById.gql". Rename it to "user-by-id.mutation.gql"
`;

exports[`Invalid #76 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "UPPER_CASE",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.UserById.gql". Rename it to "USER_BY_ID.mutation.gql"
`;

exports[`Invalid #77 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "camelCase",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.UserById.gql". Rename it to "userById.mutation.gql"
`;

exports[`Invalid #78 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.UserById.gql". Rename it to "user_by_id.mutation.gql"
`;

exports[`Invalid #79 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "kebab-case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "user-by-id.mutation.gql"
`;

exports[`Invalid #80 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "PascalCase",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "UserById.mutation.gql"
`;

exports[`Invalid #81 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "camelCase",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "userById.mutation.gql"
`;

exports[`Invalid #82 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.USER_BY_ID.gql". Rename it to "user_by_id.mutation.gql"
`;

exports[`Invalid #83 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "kebab-case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.userById.gql". Rename it to "user-by-id.mutation.gql"
`;

exports[`Invalid #84 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "PascalCase",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.userById.gql". Rename it to "UserById.mutation.gql"
`;

exports[`Invalid #85 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "UPPER_CASE",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.userById.gql". Rename it to "USER_BY_ID.mutation.gql"
`;

exports[`Invalid #86 1`] = `
#### ⌨️ Code

      1 | mutation UserById { user { id } }

#### ⚙️ Options

    {
      "mutation": {
        "style": "snake_case",
        "suffix": ".mutation"
      }
    }

#### ❌ Error

    > 1 | mutation UserById { user { id } }
        | ^ Unexpected filename "mutation.userById.gql". Rename it to "user_by_id.mutation.gql"
`;

exports[`Invalid #87 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "PascalCase",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.user-by-id.gql". Rename it to "UserById.subscription.gql"
`;

exports[`Invalid #88 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "UPPER_CASE",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.user-by-id.gql". Rename it to "USER_BY_ID.subscription.gql"
`;

exports[`Invalid #89 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "camelCase",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.user-by-id.gql". Rename it to "userById.subscription.gql"
`;

exports[`Invalid #90 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.user-by-id.gql". Rename it to "user_by_id.subscription.gql"
`;

exports[`Invalid #91 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "kebab-case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.UserById.gql". Rename it to "user-by-id.subscription.gql"
`;

exports[`Invalid #92 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "UPPER_CASE",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.UserById.gql". Rename it to "USER_BY_ID.subscription.gql"
`;

exports[`Invalid #93 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "camelCase",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.UserById.gql". Rename it to "userById.subscription.gql"
`;

exports[`Invalid #94 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.UserById.gql". Rename it to "user_by_id.subscription.gql"
`;

exports[`Invalid #95 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "kebab-case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "user-by-id.subscription.gql"
`;

exports[`Invalid #96 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "PascalCase",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "UserById.subscription.gql"
`;

exports[`Invalid #97 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "camelCase",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "userById.subscription.gql"
`;

exports[`Invalid #98 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.USER_BY_ID.gql". Rename it to "user_by_id.subscription.gql"
`;

exports[`Invalid #99 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "kebab-case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.userById.gql". Rename it to "user-by-id.subscription.gql"
`;

exports[`Invalid #100 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "PascalCase",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.userById.gql". Rename it to "UserById.subscription.gql"
`;

exports[`Invalid #101 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "UPPER_CASE",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.userById.gql". Rename it to "USER_BY_ID.subscription.gql"
`;

exports[`Invalid #102 1`] = `
#### ⌨️ Code

      1 | subscription UserById { user { id } }

#### ⚙️ Options

    {
      "subscription": {
        "style": "snake_case",
        "suffix": ".subscription"
      }
    }

#### ❌ Error

    > 1 | subscription UserById { user { id } }
        | ^ Unexpected filename "subscription.userById.gql". Rename it to "user_by_id.subscription.gql"
`;
