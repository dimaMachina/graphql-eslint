# `relay-page-info`

- Category: `Schema`
- Rule name: `@graphql-eslint/relay-page-info`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Set of rules to follow Relay specification for `PageInfo` object.

- `PageInfo` must be an Object type
- `PageInfo` must contain fields `hasPreviousPage` and `hasNextPage`, that return non-null Boolean
- `PageInfo` must contain fields `startCursor` and `endCursor`, that return either String or Scalar, which can be null if there are no results

## Usage Examples

### Correct

```graphql
# eslint @graphql-eslint/relay-page-info: 'error'

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
  startCursor: String
  endCursor: String
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/relay-page-info.ts)
- [Test source](../../packages/plugin/tests/relay-page-info.spec.ts)
