# `no-unused-variables`

- Category: `Validation`
- Rule name: `@graphql-eslint/no-unused-variables`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/NoUnusedVariablesRule.js).