# `no-one-place-fragments`

- Category: `Operations`
- Rule name: `@graphql-eslint/no-one-place-fragments`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

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

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-one-place-fragments.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-one-place-fragments.spec.ts)
