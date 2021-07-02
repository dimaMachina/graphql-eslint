# `no-anonymous-operations`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-anonymous-operations`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-anonymous-operations: 'error'

query {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-anonymous-operations: 'error'

query user {
  # ...
}
```