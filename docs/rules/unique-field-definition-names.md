# `unique-field-definition-names`

- Category: `Validation`
- Rule name: `@graphql-eslint/unique-field-definition-names`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL complex type is only valid if all its fields are uniquely named.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/master/src/validation/rules/UniqueFieldDefinitionNamesRule.js).