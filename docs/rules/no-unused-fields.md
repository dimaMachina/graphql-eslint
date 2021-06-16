# `no-unused-fields`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-unused-fields`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Requires all fields to be used at some level by siblings operations

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-unused-fields: ["error"]

type User {
  id: ID!
  name: String
  someUnusedField: String
}

type Query {
  me: User
}

query {
  me {
    id
    name
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-unused-fields: ["error"]

type User {
  id: ID!
  name: String
}

type Query {
  me: User
}

query {
  me {
    id
    name
  }
}
```