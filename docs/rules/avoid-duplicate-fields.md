# `avoid-duplicate-fields`

- Category: `Stylistic Issues`
- Rule name: `@graphql-eslint/avoid-duplicate-fields`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-duplicate-fields: 'error'

query {
  user {
    name
    email
    name # duplicate field
  }
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-duplicate-fields: 'error'

query {
  users(
    first: 100
    skip: 50
    after: "cji629tngfgou0b73kt7vi5jo"
    first: 100 # duplicate argument
  ) {
    id
  }
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-duplicate-fields: 'error'

query (
  $first: Int!
  $first: Int! # duplicate variable
) {
  users(first: $first, skip: 50) {
    id
  }
}
```

## Resources

- [Rule source](../../packages/plugin/src/rules/avoid-duplicate-fields.ts)
- [Test source](../../packages/plugin/tests/avoid-duplicate-fields.spec.ts)
