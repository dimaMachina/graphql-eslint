---
'@graphql-eslint/eslint-plugin': major
---

feat: add new options for `naming-convention` rule

Options for `naming-convention` are changed. New option `types` include the following kinds:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `EnumTypeDefinition`
- `ScalarTypeDefinition`
- `InputObjectTypeDefinition`
- `UnionTypeDefinition`

New option `fields` include the following kinds:

- `FieldDefinition`
- `InputValueDefinition`
- `VariableDefinition` (new in v3)
- `Argument` (new in v3)
- `DirectiveDefinition` (new in v3)

`QueryDefinition` option is removed in favor of `AST` specific
selector `FieldDefinition[parent.name.value=Query]`.

Before

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
      "QueryDefinition": "camelCase"
    }
  ]
}
```

After

```json
{
  "@graphql-eslint/naming-convention": [
    "error",
    {
      "types": "PascalCase",
      "fields": "camelCase",
      "overrides": {
        "FieldDefinition[parent.name.value=Query]": "camelCase"
      }
    }
  ]
}
```
