---
'@graphql-eslint/eslint-plugin': major
---

feat: add new options for `require-description` rule

Options for `require-description` are changed. New option `types` includes the following kinds:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `EnumTypeDefinition`
- `ScalarTypeDefinition` (new in v3)
- `InputObjectTypeDefinition`
- `UnionTypeDefinition`

Before

```json
{
  "@graphql-eslint/require-description": [
    "error",
    {
      "on": [
        "ObjectTypeDefinition",
        "InterfaceTypeDefinition",
        "EnumTypeDefinition",
        "InputObjectTypeDefinition",
        "UnionTypeDefinition",
        "FieldDefinition",
        "InputValueDefinition",
        "EnumValueDefinition",
        "DirectiveDefinition"
      ]
    }
  ]
}
```

After

```json
{
  "@graphql-eslint/require-description": [
    "error",
    {
      "types": true,
      "overrides": {
        "FieldDefinition":  true,
        "InputValueDefinition": true,
        "EnumValueDefinition":  true,
        "DirectiveDefinition": true
      }
    }
  ]
}
```
