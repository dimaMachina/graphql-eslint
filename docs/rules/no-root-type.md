# `no-root-type`

- Category: `Validation`
- Rule name: `@graphql-eslint/no-root-type`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Disallow using root types for `read-only` or `write-only` schemas.

## Usage Examples

### Incorrect (`read-only` schema)

```graphql
# eslint @graphql-eslint/no-root-type: ['error', { disallow: ['mutation', 'subscription'] }]

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

### Incorrect (`write-only` schema)

```graphql
# eslint @graphql-eslint/no-root-type: ['error', { disallow: ['query'] }]

type Query {
  users: [User!]!
}
```

### Correct (`read-only` schema)

```graphql
# eslint @graphql-eslint/no-root-type: ['error', { disallow: ['mutation', 'subscription'] }]

type Query {
  users: [User!]!
}
```

## Config Schema

The schema defines the following properties:

### `disallow` (array, required)

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

## Resources

- [Rule source](../../packages/plugin/src/rules/no-root-type.ts)
- [Test source](../../packages/plugin/tests/no-root-type.spec.ts)
