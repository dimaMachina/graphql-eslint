# `require-description`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/require-description`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce descriptions in your type definitions.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-description: ['error', { on: ['ObjectTypeDefinition', 'FieldDefinition'] }]

type someTypeName {
  name: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-description: ['error', { on: ['ObjectTypeDefinition', 'FieldDefinition'] }]

"""
Some type description
"""
type someTypeName {
  """
  Name description
  """
  name: String
}
```

## Config Schema

### (array)

The schema defines an array with all elements of the type `object`.

The array object has the following properties:

#### `on` (array)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`

Additional restrictions:

* Minimum items: `1`