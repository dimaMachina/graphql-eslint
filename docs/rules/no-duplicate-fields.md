# `no-duplicate-fields`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

💡 This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Operations`
- Rule name: `@graphql-eslint/no-duplicate-fields`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-duplicate-fields: 'error'

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
# eslint @graphql-eslint/no-duplicate-fields: 'error'

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
# eslint @graphql-eslint/no-duplicate-fields: 'error'

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

- [Rule source](../../packages/plugin/src/rules/no-duplicate-fields.ts)
- [Test source](../../packages/plugin/tests/no-duplicate-fields.spec.ts)
