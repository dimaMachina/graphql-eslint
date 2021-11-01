# `unique-operation-name`

- Category: `Operations`
- Rule name: `@graphql-eslint/unique-operation-name`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce unique operation names across your project.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/unique-operation-name: 'error'

# foo.query.graphql
query user {
  user {
    id
  }
}

# bar.query.graphql
query user {
  me {
    id
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/unique-operation-name: 'error'

# foo.query.graphql
query user {
  user {
    id
  }
}

# bar.query.graphql
query me {
  me {
    id
  }
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/unique-operation-name.ts)
- [Test source](../../packages/plugin/tests/unique-operation-name.spec.ts)
