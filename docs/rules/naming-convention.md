# `naming-convention`

- Category: `Best practices`
- Rule name: `@graphql-eslint/naming-convention`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require names to follow specified conventions.

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

#### `FieldDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `InputObjectTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `EnumValueDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `InputValueDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `ObjectTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `InterfaceTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `EnumTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `UnionTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `ScalarTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `OperationDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `FragmentDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

#### `QueryDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

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

---

# Sub Schemas

The schema defines the following additional types:

## `asString` (string)

One of: `camelCase`, `PascalCase`, `snake_case`, `UPPER_CASE`

## `asObject` (object)

Properties of the `asObject` object:

### `style` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`

### `prefix` (string)

### `suffix` (string)

### `forbiddenPrefixes` (array)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`

### `forbiddenSuffixes` (array)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`