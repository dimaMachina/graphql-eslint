# `no-unused-fields`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-unused-fields`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Requires all fields to be used at some level by siblings operations.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-unused-fields: 'error'

type User {
  id: ID!
  name: String
  someUnusedField: String
}

type Query {
  me: User
}

query {
  me {
    id
    name
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-unused-fields: 'error'

type User {
  id: ID!
  name: String
}

type Query {
  me: User
}

query {
  me {
    id
    name
  }
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-unused-fields.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-unused-fields.spec.ts)
