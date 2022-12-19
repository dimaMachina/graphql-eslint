# `value-literals-of-correct-type`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file
enables this rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Operations`
- Rule name: `@graphql-eslint/value-literals-of-correct-type`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all value literals are of the type expected at their position.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/ValuesOfCorrectTypeRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/ValuesOfCorrectTypeRule-test.ts)
