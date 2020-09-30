## Avoid Duplicates In Enum Values

- Name: `no-case-insensitive-enum-values-duplicates`
- Requires GraphQL Schema: `false`

Checks enums values for duplicate values defined (case-insensitive).

### Usage Example

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/no-case-insensitive-enum-values-duplicates: ["error"]

enum MyEnum {
  Value
  VALUE
  ValuE
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/no-case-insensitive-enum-values-duplicates: ["error"]

enum MyEnum {
  Value1
  Value2
  Value3
}
```
