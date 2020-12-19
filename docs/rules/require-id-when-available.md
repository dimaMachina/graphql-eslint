# `require-id-when-available`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/require-id-when-available`
- Requires GraphQL Schema: `true`
- Requires GraphQL Operations: `true`

This rule allow you to enforce selecting specific fields when they are available on the GraphQL type.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-id-when-available: ["error"]

# In your schema
type User {
  id: ID!
  name: String!
}

# Query
query user {
  user {
    name
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-id-when-available: ["error"]

# In your schema
type User {
  id: ID!
  name: String!
}

# Query
query user {
  user {
    id
    name
  }
}
```

## Config Schema

The schema defines the following properties: