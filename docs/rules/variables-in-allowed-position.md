# `variables-in-allowed-position`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/variables-in-allowed-position`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Variables passed to field arguments conform to type.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/VariablesInAllowedPositionRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/VariablesInAllowedPositionRule-test.ts)
