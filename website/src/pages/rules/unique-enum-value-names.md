# `unique-enum-value-names`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file
enables this rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/unique-enum-value-names`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

A GraphQL enum type is only valid if all its values are uniquely named.

> This rule disallows case-insensitive enum values duplicates too.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/unique-enum-value-names: 'error'

enum MyEnum {
  Value
  VALUE
  ValuE
}
```

### Correct

```graphql
# eslint @graphql-eslint/unique-enum-value-names: 'error'

enum MyEnum {
  Value1
  Value2
  Value3
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/unique-enum-value-names.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/unique-enum-value-names.spec.ts)
