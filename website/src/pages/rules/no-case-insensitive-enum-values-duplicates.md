# `no-case-insensitive-enum-values-duplicates`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file
enables this rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-case-insensitive-enum-values-duplicates`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

A GraphQL enum type is only valid if all its values are uniquely named.

> This rule disallow case-insensitive enum values duplicates too.

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

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-case-insensitive-enum-values-duplicates.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-case-insensitive-enum-values-duplicates.spec.ts)
