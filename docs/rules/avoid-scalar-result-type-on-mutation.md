# `avoid-scalar-result-type-on-mutation`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/avoid-scalar-result-type-on-mutation`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Avoid scalar result type on mutation type to make sure to return a valid state.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-scalar-result-type-on-mutation: 'error'

type Mutation {
  createUser: Boolean
}
```

### Correct

```graphql
# eslint @graphql-eslint/avoid-scalar-result-type-on-mutation: 'error'

type Mutation {
  createUser: User!
}
```