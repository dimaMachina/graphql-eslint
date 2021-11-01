# `no-case-insensitive-enum-values-duplicates`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file enables this rule.

🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically fix some of the problems reported by this rule.

- Category: `Schema`
- Rule name: `@graphql-eslint/no-case-insensitive-enum-values-duplicates`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Disallow case-insensitive enum values duplicates.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-case-insensitive-enum-values-duplicates: 'error'

enum MyEnum {
  Value
  VALUE
  ValuE
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-case-insensitive-enum-values-duplicates: 'error'

enum MyEnum {
  Value1
  Value2
  Value3
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-case-insensitive-enum-values-duplicates.ts)
