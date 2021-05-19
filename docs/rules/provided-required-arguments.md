# `provided-required-arguments`

- Category: `Validation`
- Rule name: `@graphql-eslint/provided-required-arguments`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/ProvidedRequiredArgumentsRule.js).