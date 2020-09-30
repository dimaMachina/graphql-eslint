# Enforce naming conventions patterns in your typeDefs

- Name: `naming-convention`
- Requires GraphQL Schema: `false`

Following the same naming conventions in all your type definitions will make them easier to read and more predictable.

## Rule Details

This rule enforces naming conventions patterns for your type definitions. It can control if the names should be in PascalCase, camelCase, snake_case or UPPER_CASE. It can also allow or disallow trailing and leading underscores.

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/naming-convention: ["error", { ObjectTypeDefinition: "PascalCase" }]

type someTypeName {
    ...
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/naming-convention: ["error", { FieldDefinition: "camelCase", ObjectTypeDefinition: "PascalCase" }]

type SomeTypeName {
  someFieldName: String
}
```

## Options

This rule accepts configuration object with multiple options:

- `ObjectTypeDefinition: 'PascalCase'|'camelCase'|'snake_case'|'UPPER_CASE'` - Will affect names of types, input objects, enums and interfaces
- `FieldDefinition: 'PascalCase'|'camelCase'|'snake_case'|'UPPER_CASE'` - Will affect names of type fields
- `EnumValueDefinition: 'PascalCase'|'camelCase'|'snake_case'|'UPPER_CASE'` - Will affect names of enumeration values
- `InputValueDefinition: 'PascalCase'|'camelCase'|'snake_case'|'UPPER_CASE'` - Will affect names of input properties
- `FragmentDefinition: 'PascalCase'|'camelCase'|'snake_case'|'UPPER_CASE'` - Will affect names of fragments
- `ScalarTypeDefinition: 'PascalCase'|'camelCase'|'snake_case'|'UPPER_CASE'` - Will affect names of scalars
- `leadingUnderscore: 'allow'|'forbid'` - Will allow or forbid leading underscores in all names. Default value is `forbid`.
- `trailingUnderscore: 'allow'|'forbid'` - Will allow of forbid trailing underscores in all names. Default value is `forbid`.
