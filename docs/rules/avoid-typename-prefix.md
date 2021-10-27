# `avoid-typename-prefix`

✅ The `"extends": "plugin:@graphql-eslint/recommended"` property in a configuration file enables this rule.

- Category: `Best Practices`
- Rule name: `@graphql-eslint/avoid-typename-prefix`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforces users to avoid using the type name in a field name while defining your schema.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-typename-prefix: 'error'

type User {
  userId: ID!
}
```

### Correct

```graphql
# eslint @graphql-eslint/avoid-typename-prefix: 'error'

type User {
  id: ID!
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/avoid-typename-prefix.ts)
- [Test source](../../packages/plugin/tests/avoid-typename-prefix.spec.ts)
