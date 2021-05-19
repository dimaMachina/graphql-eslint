# `unique-operation-types`

- Category: `Validation`
- Rule name: `@graphql-eslint/unique-operation-types`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if it has only one type per operation.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/UniqueOperationTypesRule.js).