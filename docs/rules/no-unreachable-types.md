# `no-unreachable-types`

🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically fix some of the problems reported by this rule.

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-unreachable-types`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Requires all types to be reachable at some level by root level fields.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-unreachable-types: 'error'

type User {
  id: ID!
  name: String
}

type Query {
  me: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-unreachable-types: 'error'

type User {
  id: ID!
  name: String
}

type Query {
  me: User
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-unreachable-types.ts)
- [Test source](../../packages/plugin/tests/no-unreachable-types.spec.ts)
