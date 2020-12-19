# `no-operation-name-suffix`

- Category: `Stylistic Issues`
- Rule name: `@graphql-eslint/no-operation-name-suffix`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

Makes sure you are not adding the operation type to the name of the operation.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-operation-name-suffix: ["error"]

query userQuery {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-operation-name-suffix: ["error"]

query user {
  # ...
}
```