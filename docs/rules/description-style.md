# `description-style`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file enables this rule.

- Category: `Schema`
- Rule name: `@graphql-eslint/description-style`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require all comments to follow the same style (either block or inline).

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/description-style: ['error', { style: 'inline' }]

""" Description """
type someTypeName {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/description-style: ['error', { style: 'inline' }]

" Description "
type someTypeName {
  # ...
}
```

## Config Schema

The schema defines the following properties:

### `style` (enum)

This element must be one of the following enum values:

- `block`
- `inline`

Default: `"block"`

## Resources

- [Rule source](../../packages/plugin/src/rules/description-style.ts)
- [Test source](../../packages/plugin/tests/description-style.spec.ts)
