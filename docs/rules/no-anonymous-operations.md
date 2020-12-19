# `no-anonymous-operations`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-anonymous-operations`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-anonymous-operations: ["error"]

query {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-anonymous-operations: ["error"]

query user {
  # ...
}
```