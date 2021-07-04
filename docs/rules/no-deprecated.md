# `no-deprecated`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-deprecated`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce that deprecated fields or enum values are not in use by operations.

## Usage Examples

### Incorrect (field)

```graphql
# eslint @graphql-eslint/no-deprecated: 'error'

# In your schema
type User {
  id: ID!
  name: String! @deprecated(reason: "old field, please use fullName instead")
  fullName: String!
}

# Query
query user {
  user {
    name # This is deprecated, so you'll get an error
  }
}
```

### Incorrect (enum value)

```graphql
# eslint @graphql-eslint/no-deprecated: 'error'

# In your schema
type Mutation {
  changeSomething(type: SomeType): Boolean!
}

enum SomeType {
  NEW
  OLD @deprecated(reason: "old field, please use NEW instead")
}

# Mutation
mutation {
  changeSomething(
    type: OLD # This is deprecated, so you'll get an error
  ) { 
    ... 
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-deprecated: 'error'

# In your schema
type User {
  id: ID!
  name: String! @deprecated(reason: "old field, please use fullName instead")
  fullName: String!
}

# Query
query user {
  user {
    id
    fullName
  }
}
```