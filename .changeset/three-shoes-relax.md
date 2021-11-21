---
'@graphql-eslint/eslint-plugin': major
---

❗ BREAKING CHANGE ❗

feat: add new options for `naming-convention` rule

Options for `naming-convention` are changed. New option `types` includes the following kinds:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `EnumTypeDefinition`
- `ScalarTypeDefinition`
- `InputObjectTypeDefinition`
- `UnionTypeDefinition`

Added new options:

- `Argument`
- `DirectiveDefinition`
- `VariableDefinition`

Option `QueryDefinition` was removed in favor of `AST` specific selector `FieldDefinition[parent.name.value=Query]`.

### Before

```json
{
  "@graphql-eslint/naming-convention": [
    "error",
    {
      "ObjectTypeDefinition": "PascalCase",
      "InterfaceTypeDefinition": "PascalCase",
      "EnumTypeDefinition": "PascalCase",
      "ScalarTypeDefinition": "PascalCase",
      "InputObjectTypeDefinition": "PascalCase",
      "UnionTypeDefinition": "PascalCase",
      "FieldDefinition": "camelCase",
      "InputValueDefinition": "camelCase",
      "QueryDefinition": {
        "forbiddenPrefixes": ["get"]
      },
      "leadingUnderscore": "allow",
      "trailingUnderscore": "allow"
    }
  ]
}
```

### After

```json
{
  "@graphql-eslint/naming-convention": [
    "error",
    {
      "types": "PascalCase",
      "FieldDefinition": "camelCase",
      "InputValueDefinition": "camelCase",
      "FieldDefinition[parent.name.value=Query]": {
        "forbiddenPrefixes": ["get"]
      },
      "allowLeadingUnderscore": true,
      "allowTrailingUnderscore": true
    }
  ]
}
```
