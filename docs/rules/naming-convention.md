# `naming-convention`

- Category: `Best practices`
- Rule name: `@graphql-eslint/naming-convention`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

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

#### `FieldDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `InputObjectTypeDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `EnumValueDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `InputValueDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `ObjectTypeDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `InterfaceTypeDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `EnumTypeDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `UnionTypeDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `ScalarTypeDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `OperationDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

#### `FragmentDefinition` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

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