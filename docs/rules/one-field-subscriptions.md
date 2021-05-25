# `one-field-subscriptions`

- Category: `Validation`
- Rule name: `@graphql-eslint/one-field-subscriptions`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL subscription is valid only if it contains a single root field.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/SingleFieldSubscriptionsRule.ts).