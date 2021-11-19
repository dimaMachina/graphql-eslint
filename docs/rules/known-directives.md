# `known-directives`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` and `"plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Schema & Operations`
- Rule name: `@graphql-eslint/known-directives`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all `@directives` are known by the schema and legally positioned.

> This rule is a wrapper around a `graphql-js` validation function. [You can find its source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/KnownDirectivesRule.ts).

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/KnownDirectivesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/KnownDirectivesRule-test.ts)
