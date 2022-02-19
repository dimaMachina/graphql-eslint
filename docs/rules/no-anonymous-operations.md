# `no-anonymous-operations`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

💡 This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Operations`
- Rule name: `@graphql-eslint/no-anonymous-operations`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-anonymous-operations: 'error'

query {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-anonymous-operations: 'error'

query user {
  # ...
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-anonymous-operations.ts)
- [Test source](../../packages/plugin/tests/no-anonymous-operations.spec.ts)
