# `fields-on-correct-type`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/fields-on-correct-type`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/FieldsOnCorrectTypeRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/FieldsOnCorrectTypeRule-test.ts)
