# `no-hashtag-description`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/no-hashtag-description`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.
Allows to use hashtag for comments, as long as it's not attached to an AST definition.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-hashtag-description: 'error'

# Represents a user
type User {
  id: ID!
  name: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-hashtag-description: 'error'

" Represents a user "
type User {
  id: ID!
  name: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-hashtag-description: 'error'

# This file defines the basic User type.
# This comment is valid because it's not attached specifically to an AST object.

" Represents a user "
type User {
  id: ID! # This one is also valid, since it comes after the AST object
  name: String
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/no-hashtag-description.ts)
- [Test source](../../packages/plugin/tests/no-hashtag-description.spec.ts)
