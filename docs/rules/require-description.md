# `require-description`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/require-description`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

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