# `lone-schema-definition`

- Category: `Validation`
- Rule name: `@graphql-eslint/lone-schema-definition`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if it contains only one schema definition.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/master/src/validation/rules/LoneSchemaDefinition.js).