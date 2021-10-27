# `scalar-leafs`

✅ The `"extends": "plugin:@graphql-eslint/recommended"` property in a configuration file enables this rule.

- Category: `Validation`
- Rule name: `@graphql-eslint/scalar-leafs`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.

> This rule is a wrapper around a `graphql-js` validation function. [You can find its source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/ScalarLeafsRule.ts).

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/ScalarLeafsRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/ScalarLeafsRule-test.ts)
