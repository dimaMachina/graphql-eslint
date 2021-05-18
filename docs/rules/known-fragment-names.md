# `known-fragment-names`

- Category: `Validation`
- Rule name: `@graphql-eslint/known-fragment-names`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/KnownFragmentNames.js).