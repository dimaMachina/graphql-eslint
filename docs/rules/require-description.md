# Enforce descriptions in your type definitions

- Name: `require-description`
- Requires GraphQL Schema: `false`

Because documentation for GraphQL schemas are usually auto-generated omitting descriptions will not provide any information about types in your schema. It's considered best practice to provide descriptions for all your type definitions.

## Rule Details

This rule requires descriptions to be present in your type definitions files.

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/require-description: ["error", { on: ["ObjectTypeDefinition", "FieldDefinition"] }]

type someTypeName {
  name: String
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/require-description: ["error", { on: ["ObjectTypeDefinition", "FieldDefinition"] }]

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

## Configuration

By default, this rules doesn't enforce description on any type of AST node.

This rule accepts an configuration key called `on`, with an array strings. The values are all possible AST nodes that has `description` field available:

- `SchemaDefinition`
- `ObjectTypeDefinition`
- `FieldDefinition`
- `InputValueDefinition`
- `InterfaceTypeDefinition`
- `UnionTypeDefinition`
- `EnumTypeDefinition`
- `EnumValueDefinition`
- `InputObjectTypeDefinition`
- `DirectiveDefinition`
