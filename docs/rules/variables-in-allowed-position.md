# `variables-in-allowed-position`

- Category: `Validation`
- Rule name: `@graphql-eslint/variables-in-allowed-position`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Variables passed to field arguments conform to type.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/master/src/validation/rules/VariablesInAllowedPosition.js).