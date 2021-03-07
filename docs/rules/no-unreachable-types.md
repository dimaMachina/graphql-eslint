# `no-unreachable-types`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-unreachable-types`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)

Requires all types to be reachable at some level by root level fields

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-unreachable-types: ["error"]

type User {
  id: ID!
  name: String
}

type Query {
  me: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-unreachable-types: ["error"]

type User {
  id: ID!
  name: String
}

type Query {
  me: User
}
```