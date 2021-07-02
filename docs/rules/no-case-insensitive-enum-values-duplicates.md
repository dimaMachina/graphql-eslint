# `no-case-insensitive-enum-values-duplicates`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-case-insensitive-enum-values-duplicates`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)



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