# `require-id-when-available`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/require-id-when-available`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce selecting specific fields when they are available on the GraphQL type.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-id-when-available: 'error'

# In your schema
type User {
  id: ID!
  name: String!
}

# Query
query user {
  user {
    name
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-id-when-available: 'error'

# In your schema
type User {
  id: ID!
  name: String!
}

# Query
query user {
  user {
    id
    name
  }
}
```

## Config Schema

The schema defines the following properties:

### `fieldName` (string)

Default: `"id"`

## Resources

- [Rule source](../../packages/plugin/src/rules/require-id-when-available.ts)
- [Test source](../../packages/plugin/tests/require-id-when-available.spec.ts)
