# `no-undefined-variables`

- Category: `Validation`
- Rule name: `@graphql-eslint/no-undefined-variables`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/NoUndefinedVariablesRule.js).