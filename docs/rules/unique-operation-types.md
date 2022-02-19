# `unique-operation-types`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file enables this rule.

- Category: `Schema`
- Rule name: `@graphql-eslint/unique-operation-types`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if it has only one type per operation.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/UniqueOperationTypesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/UniqueOperationTypesRule-test.ts)
