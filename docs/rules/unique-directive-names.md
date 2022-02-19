# `unique-directive-names`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file enables this rule.

- Category: `Schema`
- Rule name: `@graphql-eslint/unique-directive-names`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all defined directives have unique names.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/UniqueDirectiveNamesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/UniqueDirectiveNamesRule-test.ts)
