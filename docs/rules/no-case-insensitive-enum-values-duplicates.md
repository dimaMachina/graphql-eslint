# `no-case-insensitive-enum-values-duplicates`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-case-insensitive-enum-values-duplicates`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`



## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-case-insensitive-enum-values-duplicates: ["error"]

enum MyEnum {
  Value
  VALUE
  ValuE
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-case-insensitive-enum-values-duplicates: ["error"]

enum MyEnum {
  Value1
  Value2
  Value3
}
```