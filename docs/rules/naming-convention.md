# `naming-convention`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` and `"plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this rule.

💡 This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema & Operations`
- Rule name: `@graphql-eslint/naming-convention`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require names to follow specified conventions.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { types: 'PascalCase', FieldDefinition: 'camelCase' }]

type user {
  first_name: String!
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { FragmentDefinition: { style: 'PascalCase', forbiddenSuffixes: ['Fragment'] } }]

fragment UserFragment on User {
  # ...
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { 'FieldDefinition[parent.name.value=Query]': { forbiddenPrefixes: ['get'] } }]

type Query {
  getUsers: [User!]!
}
```

### Correct

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { types: 'PascalCase', FieldDefinition: 'camelCase' }]

type User {
  firstName: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { FragmentDefinition: { style: 'PascalCase', forbiddenSuffixes: ['Fragment'] } }]

fragment UserFields on User {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { 'FieldDefinition[parent.name.value=Query]': { forbiddenPrefixes: ['get'] } }]

type Query {
  users: [User!]!
}
```

### Correct

```graphql
# eslint @graphql-eslint/naming-convention: ['error', { FieldDefinition: { style: 'camelCase', ignorePattern: '^(EAN13|UPC|UK)' } }]

type Product {
  EAN13: String
  UPC: String
  UKFlag: String
}
```

## Config Schema

> It's possible to use a [`selector`](https://eslint.org/docs/developer-guide/selectors) that starts with allowed `ASTNode` names which are described below.
>
> Paste or drop code into the editor in [ASTExplorer](https://astexplorer.net) and inspect the generated AST to compose your selector.
>
> Example: pattern property `FieldDefinition[parent.name.value=Query]` will match only fields for type `Query`.

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

### `Argument`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#Argument).

The object must be one of the following types:

* `asString`
* `asObject`

### `DirectiveDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#DirectiveDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `EnumTypeDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#EnumTypeDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `EnumValueDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#EnumValueDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `FieldDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#FieldDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `FragmentDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#FragmentDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `InputObjectTypeDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#InputObjectTypeDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `InputValueDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#InputValueDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `InterfaceTypeDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#InterfaceTypeDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `ObjectTypeDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#ObjectTypeDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `OperationDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#OperationDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `ScalarTypeDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#ScalarTypeDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `UnionTypeDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#UnionTypeDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `VariableDefinition`

Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#VariableDefinition).

The object must be one of the following types:

* `asString`
* `asObject`

### `allowLeadingUnderscore` (boolean)

Default: `false`

### `allowTrailingUnderscore` (boolean)

Default: `false`

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

### `ignorePattern` (string)

Option to skip validation of some words, e.g. acronyms

## Resources

- [Rule source](../../packages/plugin/src/rules/naming-convention.ts)
- [Test source](../../packages/plugin/tests/naming-convention.spec.ts)
