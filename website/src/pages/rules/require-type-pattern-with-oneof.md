# `require-type-pattern-with-oneof`

- Category: `Schema`
- Rule name: `@graphql-eslint/require-type-pattern-with-oneof`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Enforce types with `@oneOf` directive have `error` and `ok` fields.

## Usage Examples

### Correct

```graphql
# eslint @graphql-eslint/require-type-pattern-with-oneof: 'error'

type Mutation {
  doSomething: DoSomethingMutationResult!
}

interface Error {
  message: String!
}

type DoSomethingMutationResult @oneOf {
  ok: DoSomethingSuccess
  error: Error
}

type DoSomethingSuccess {
  # ...
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/require-type-pattern-with-oneof.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/require-type-pattern-with-oneof.spec.ts)
