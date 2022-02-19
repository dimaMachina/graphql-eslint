# `unique-directive-names-per-location`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` and `"plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Schema & Operations`
- Rule name: `@graphql-eslint/unique-directive-names-per-location`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/UniqueDirectivesPerLocationRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/UniqueDirectivesPerLocationRule-test.ts)
