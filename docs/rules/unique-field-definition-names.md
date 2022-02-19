# `unique-field-definition-names`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file enables this rule.

- Category: `Schema`
- Rule name: `@graphql-eslint/unique-field-definition-names`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL complex type is only valid if all its fields are uniquely named.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/UniqueFieldDefinitionNamesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/UniqueFieldDefinitionNamesRule-test.ts)
