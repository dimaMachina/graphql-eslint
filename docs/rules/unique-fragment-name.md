# `unique-fragment-name`

- Category: `Operations`
- Rule name: `@graphql-eslint/unique-fragment-name`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce unique fragment names across your project.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/unique-fragment-name: 'error'

# user.fragment.graphql
fragment UserFields on User {
  id
  name
  fullName
}

# user-fields.graphql
fragment UserFields on User {
  id
}
```

### Correct

```graphql
# eslint @graphql-eslint/unique-fragment-name: 'error'

# user.fragment.graphql
fragment AllUserFields on User {
  id
  name
  fullName
}

# user-fields.graphql
fragment UserFields on User {
  id
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/unique-fragment-name.ts)
- [Test source](../../packages/plugin/tests/unique-fragment-name.spec.ts)
