# `relay-connection-types`

- Category: `Schema`
- Rule name: `@graphql-eslint/relay-connection-types`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Set of rules to follow Relay specification for Connection types.

- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`
- Connection type must be an Object type
- Connection type must contain a field `edges` that return a list type which wraps an edge type
- Connection type must contain a field `pageInfo` that return a non-null `PageInfo` Object type

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/relay-connection-types: 'error'

type UserPayload { # should be an Object type with `Connection` suffix
  edges: UserEdge! # should return a list type
  pageInfo: PageInfo # should return a non-null `PageInfo` Object type
}
```

### Correct

```graphql
# eslint @graphql-eslint/relay-connection-types: 'error'

type UserConnection {
  edges: [UserEdge]
  pageInfo: PageInfo!
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/relay-connection-types.ts)
- [Test source](../../packages/plugin/tests/relay-connection-types.spec.ts)
