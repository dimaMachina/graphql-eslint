# `no-scalar-result-type-on-mutation`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-scalar-result-type-on-mutation`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

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

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-scalar-result-type-on-mutation.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-scalar-result-type-on-mutation.spec.ts)
