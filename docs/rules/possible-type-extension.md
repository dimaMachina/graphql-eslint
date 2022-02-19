# `possible-type-extension`

- Category: `Schema`
- Rule name: `@graphql-eslint/possible-type-extension`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A type extension is only valid if the type is defined and has the same kind.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/PossibleTypeExtensionsRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/PossibleTypeExtensionsRule-test.ts)
