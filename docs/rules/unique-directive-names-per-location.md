# `unique-directive-names-per-location`

- Category: `Validation`
- Rule name: `@graphql-eslint/unique-directive-names-per-location`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/UniqueDirectivesPerLocationRule.ts).