# `require-import-fragment`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Operations`
- Rule name: `@graphql-eslint/require-import-fragment`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Require fragments to be imported via an import expression.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

query {
  user {
    ...UserFields
  }
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

# import 'post-fields.fragment.graphql'
query {
  user {
    ...UserFields
  }
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

# import UserFields from 'post-fields.fragment.graphql'
query {
  user {
    ...UserFields
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

# import UserFields from 'user-fields.fragment.graphql'
query {
  user {
    ...UserFields
  }
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/require-import-fragment.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/require-import-fragment.spec.ts)
