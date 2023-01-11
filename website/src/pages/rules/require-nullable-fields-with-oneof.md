# `require-nullable-fields-with-oneof`

- Category: `Schema`
- Rule name: `@graphql-eslint/require-nullable-fields-with-oneof`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

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

- [Rule source](../../packages/plugin/src/rules/require-nullable-fields-with-oneof.ts)
- [Test source](../../packages/plugin/tests/require-nullable-fields-with-oneof.spec.ts)
