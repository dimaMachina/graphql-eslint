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
  foo {
    ...FooFields
  }
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

# import 'bar.graphql'
query {
  foo {
    ...FooFields
  }
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

# import FooFields from 'bar.graphql'
query {
  foo {
    ...FooFields
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-import-fragment: 'error'

# import FooFields from 'foo.graphql'
query {
  foo {
    ...FooFields
  }
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/require-import-fragment.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/tests/require-import-fragment.spec.ts)
