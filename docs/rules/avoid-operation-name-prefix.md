# `avoid-operation-name-prefix`

- Category: `Stylistic Issues`
- Rule name: `@graphql-eslint/avoid-operation-name-prefix`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce/avoid operation name prefix, useful if you wish to avoid prefix in your root fields, or avoid using REST terminology in your schema.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-operation-name-prefix: ['error', { keywords: ['get'] }]

query getUserDetails {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/avoid-operation-name-prefix: ['error', { keywords: ['get'] }]

query userDetails {
  # ...
}
```

## Config Schema

The schema defines the following properties:

### `caseSensitive` (boolean)

Default: `false`

### `keywords` (array, required)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`