# `no-unused-fragments`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/no-unused-fragments`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/NoUnusedFragmentsRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/NoUnusedFragmentsRule-test.ts)
