# `no-scalar-result-type-on-mutation`

- Category: `Schema`
- Rule name: `@graphql-eslint/no-scalar-result-type-on-mutation`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Avoid scalar result type on mutation type to make sure to return a valid state.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-scalar-result-type-on-mutation: 'error'

type Mutation {
  createUser: Boolean
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-scalar-result-type-on-mutation: 'error'

type Mutation {
  createUser: User!
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-scalar-result-type-on-mutation.ts)
- [Test source](../../packages/plugin/tests/no-scalar-result-type-on-mutation.spec.ts)
