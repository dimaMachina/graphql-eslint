# `no-one-place-fragments`

- Category: `Operations`
- Rule name: `@graphql-eslint/no-one-place-fragments`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Disallow fragments that are used only in one place.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-one-place-fragments: 'error'

fragment UserFields on User {
  id
}

{
  user {
    ...UserFields
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-one-place-fragments: 'error'

fragment UserFields on User {
  id
}

{
  user {
    ...UserFields
    friends {
      ...UserFields
    }
  }
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-one-place-fragments.ts)
- [Test source](../../packages/plugin/tests/no-one-place-fragments.spec.ts)
