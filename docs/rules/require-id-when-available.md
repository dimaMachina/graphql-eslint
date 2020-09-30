## Require querying id (or other field) when field exists

- Name: `require-id-when-available`
- Requires GraphQL Schema: `true`

This rule allow you to enforce selecting specific fields when they are available on the GraphQL type.

It's useful for GraphQL client libraries that are using `id` field for caching (when queried).

### Usage Example

Examples of **incorrect** code for this rule:

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

Examples of **correct** code for this rule:

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
