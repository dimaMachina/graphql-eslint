# `unique-fragment-name`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/unique-fragment-name`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

This rule allow you to enforce unique fragment name across your application.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/unique-fragment-name: ["error"]

# user.fragment.graphql
fragment UserFields on User {
  id
  name
  fullName
}

# user-fields.graphql
fragment UserFields on User {
  id
}
```

### Correct

```graphql
# eslint @graphql-eslint/unique-fragment-name: ["error"]

# user.fragment.graphql
fragment AllUserFields on User {
  id
  name
  fullName
}

# user-fields.graphql
fragment UserFields on User {
  id
}
```