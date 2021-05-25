# `lone-anonymous-operation`

- Category: `Validation`
- Rule name: `@graphql-eslint/lone-anonymous-operation`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/LoneAnonymousOperationRule.ts).