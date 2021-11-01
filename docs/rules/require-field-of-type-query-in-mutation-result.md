# `require-field-of-type-query-in-mutation-result`

- Category: `Schema`
- Rule name: `@graphql-eslint/require-field-of-type-query-in-mutation-result`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Allow the client in one round-trip not only to call mutation but also to get a wagon of data to update their application.
> Currently, no errors are reported for result type `union`, `interface` and `scalar`.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-field-of-type-query-in-mutation-result: 'error'

type User { ... }

type Mutation {
  createUser: User!
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-field-of-type-query-in-mutation-result: 'error'

type User { ... }

type Query { ... }

type CreateUserPayload {
  user: User!
  query: Query!
}

type Mutation {
  createUser: CreateUserPayload!
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/require-field-of-type-query-in-mutation-result.ts)
- [Test source](../../packages/plugin/tests/require-field-of-type-query-in-mutation-result.spec.ts)
