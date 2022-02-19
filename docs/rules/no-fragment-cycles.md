# `no-fragment-cycles`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/no-fragment-cycles`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL fragment is only valid when it does not have cycles in fragments usage.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/NoFragmentCyclesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/NoFragmentCyclesRule-test.ts)
