# `require-id-when-available`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

💡 This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

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
query {
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
query {
  user {
    id
    name
  }
}

# Selecting `id` with an alias is also valid
query {
  user {
    id: name
  }
}
```

## Config Schema

The schema defines the following properties:

### `fieldName`

The object must be one of the following types:

* `asString`
* `asArray`

Default: `"id"`

---

# Sub Schemas

The schema defines the following additional types:

## `asString` (string)

## `asArray` (array)

## Resources

- [Rule source](../../packages/plugin/src/rules/require-id-when-available.ts)
- [Test source](../../packages/plugin/tests/require-id-when-available.spec.ts)
