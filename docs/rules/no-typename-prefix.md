# `no-typename-prefix`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file enables this rule.

💡 This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-typename-prefix`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforces users to avoid using the type name in a field name while defining your schema.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-typename-prefix: 'error'

type User {
  userId: ID!
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-typename-prefix: 'error'

type User {
  id: ID!
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-typename-prefix.ts)
- [Test source](../../packages/plugin/tests/no-typename-prefix.spec.ts)
