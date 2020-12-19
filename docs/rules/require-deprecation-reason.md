# `require-deprecation-reason`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/require-deprecation-reason`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

Require all deprecation directives to specify a reason

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-deprecation-reason: ["error"]

type MyType {
  name: String @deprecated
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/require-deprecation-reason: ["error"]

type MyType {
  name: String @deprecated(reason: "")
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-deprecation-reason: ["error"]

type MyType {
  name: String @deprecated(reason: "no longer relevant, please use fullName field")
}
```