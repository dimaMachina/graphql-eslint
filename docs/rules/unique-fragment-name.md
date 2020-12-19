# `unique-fragment-name`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/unique-fragment-name`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `true`

This rule allow you to enforce selecting specific fields when they are available on the GraphQL type.

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