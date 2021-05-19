# `no-unused-fragments`

- Category: `Validation`
- Rule name: `@graphql-eslint/no-unused-fragments`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/NoUnusedFragmentsRule.js).