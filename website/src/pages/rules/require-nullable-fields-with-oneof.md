# `require-nullable-fields-with-oneof`

- Category: `Schema`
- Rule name: `@graphql-eslint/require-nullable-fields-with-oneof`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Require `input` or `type` fields to be non-nullable with `@oneOf` directive.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-nullable-fields-with-oneof: 'error'

input Input @oneOf {
  foo: String!
  b: Int
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-nullable-fields-with-oneof: 'error'

input Input @oneOf {
  foo: String
  bar: Int
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/require-nullable-fields-with-oneof.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/require-nullable-fields-with-oneof.spec.ts)
