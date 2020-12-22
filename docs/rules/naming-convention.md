# `naming-convention`

- Category: `Best practices`
- Rule name: `@graphql-eslint/naming-convention`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Requires description around GraphQL nodes

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/naming-convention: ["error", [{"ObjectTypeDefinition":"PascalCase"}]]

type someTypeName {
  f: String!
}
```

### Correct

```graphql
# eslint @graphql-eslint/naming-convention: ["error", [{"FieldDefinition":"camelCase","ObjectTypeDefinition":"PascalCase"}]]

type SomeTypeName {
  someFieldName: String
}
```

## Config Schema

### (array)

The schema defines an array with all elements of the type `object`.

The array object has the following properties:

#### `FieldDefinition` (string,object)

#### `InputObjectTypeDefinition` (string,object)

#### `EnumValueDefinition` (string,object)

#### `InputValueDefinition` (string,object)

#### `ObjectTypeDefinition` (string,object)

#### `InterfaceTypeDefinition` (string,object)

#### `EnumTypeDefinition` (string,object)

#### `UnionTypeDefinition` (string,object)

#### `ScalarTypeDefinition` (string,object)

#### `OperationDefinition` (string,object)

#### `FragmentDefinition` (string,object)

#### `leadingUnderscore` (string, enum)

This element must be one of the following enum values:

* `allow`
* `forbid`

Default: `"forbid"`

#### `trailingUnderscore` (string, enum)

This element must be one of the following enum values:

* `allow`
* `forbid`

Default: `"forbid"`