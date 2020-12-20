# `require-description`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/require-description`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce descriptions in your type definitions

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-description: ["error", [{"on":["ObjectTypeDefinition","FieldDefinition"]}]]

type someTypeName {
  name: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-description: ["error", [{"on":["ObjectTypeDefinition","FieldDefinition"]}]]

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

The schema defines the following properties: