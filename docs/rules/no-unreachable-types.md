# `no-unreachable-types`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-unreachable-types`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

This rule allow you to enforce that all types have to reachable by root level fields (Query.*, Mutation.*, Subscription.*).

## Usage Examples

### Incorrect (field)

```graphql
# eslint @graphql-eslint/no-unreachable-types: ["error"]

type Query {
  me: String
}

type User { # This is not used, so you'll get an error
  id: ID!
  name: String!
}
```


### Correct

```graphql
# eslint @graphql-eslint/no-unreachable-types: ["error"]

type Query {
  me: User
}

type User { # This is now used, so you won't get an error
  id: ID!
  name: String!
}
```