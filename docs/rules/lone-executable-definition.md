# `lone-executable-definition`

- Category: `Operations`
- Rule name: `@graphql-eslint/lone-executable-definition`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require all queries, mutations, subscriptions and fragments to be located in separate files.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/lone-executable-definition: 'error'

query Foo {
  id
}
fragment Bar on Baz {
  id
}
```

### Correct

```graphql
# eslint @graphql-eslint/lone-executable-definition: 'error'

query Foo {
  id
}
```

## Config Schema

The schema defines the following properties:

### `ignores` (array)

Allow certain definitions to be placed alongside others.

The elements of the array can contain the following enum values:

- `query`
- `fragment`
- `mutation`
- `subscription`

Additional restrictions:

- Minimum items: `1`
- Unique items: `true`

## Resources

- [Rule source](../../packages/plugin/src/rules/lone-executable-definition.ts)
- [Test source](../../packages/plugin/tests/lone-executable-definition.spec.ts)
