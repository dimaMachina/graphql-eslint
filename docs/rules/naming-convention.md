# `naming-convention`

✅ The `"extends": "plugin:@graphql-eslint/recommended"` property in a configuration file enables this rule.

- Category: `Best Practices`
- Rule name: `@graphql-eslint/naming-convention`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require names to follow specified conventions.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { types: 'PascalCase', fields: 'camelCase' }]

type user {
  first_name: String!
}
```

### Correct

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { types: 'PascalCase', fields: 'camelCase' }]

type User {
  firstName: String
}
```

## Config Schema

The schema defines the following properties:

### `types`

Includes:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `EnumTypeDefinition`
- `ScalarTypeDefinition`
- `InputObjectTypeDefinition`
- `UnionTypeDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

### `fields`

Includes:

- `FieldDefinition`
- `InputValueDefinition`
- `VariableDefinition`
- `Argument`
- `DirectiveDefinition`

The object must be one of the following types:

* `asString`
* `asObject`

### `allowLeadingUnderscore` (boolean)

Default: `false`

### `allowTrailingUnderscore` (boolean)

Default: `false`

### `overrides` (object)

May contain the following `ASTNode` names:

- `Argument`
- `DirectiveDefinition`
- `EnumTypeDefinition`
- `EnumValueDefinition`
- `FieldDefinition`
- `FragmentDefinition`
- `InputObjectTypeDefinition`
- `InputValueDefinition`
- `InterfaceTypeDefinition`
- `ObjectTypeDefinition`
- `OperationDefinition`
- `ScalarTypeDefinition`
- `UnionTypeDefinition`
- `VariableDefinition`

> It's also possible to use a [`selector`](https://eslint.org/docs/developer-guide/selectors) that starts with `ASTNode` name
>
> Example: pattern property `FieldDefinition[parent.name.value=Query]` will match only fields for type `Query`

Pattern properties of the `overrides` object:

#### `^(Argument|DirectiveDefinition|EnumTypeDefinition|EnumValueDefinition|FieldDefinition|FragmentDefinition|InputObjectTypeDefinition|InputValueDefinition|InterfaceTypeDefinition|ObjectTypeDefinition|OperationDefinition|ScalarTypeDefinition|UnionTypeDefinition|VariableDefinition)(.+)?$`

The object must be one of the following types:

* `asString`
* `asObject`

---

# Sub Schemas

The schema defines the following additional types:

## `asString` (enum)

One of: `camelCase`, `PascalCase`, `snake_case`, `UPPER_CASE`

## `asObject` (object)

Properties of the `asObject` object:

### `style` (enum)

This element must be one of the following enum values:

- `camelCase`
- `PascalCase`
- `snake_case`
- `UPPER_CASE`

### `prefix` (string)

### `suffix` (string)

### `forbiddenPrefixes` (array)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

### `forbiddenSuffixes` (array)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

## Resources

- [Rule source](../../packages/plugin/src/rules/naming-convention.ts)
- [Test source](../../packages/plugin/tests/naming-convention.spec.ts)
