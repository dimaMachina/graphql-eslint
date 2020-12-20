# `description-style`

- Category: `Stylistic Issues`
- Rule name: `@graphql-eslint/description-style`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Require all comments to follow the same style (either block or inline)

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/description-style: ["error", [{"style":"inline"}]]

""" Description """
type someTypeName {
    ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/description-style: ["error", [{"style":"inline"}]]

" Description "
type someTypeName {
    ...
}
```

## Config Schema

### (array)

The schema defines an array with all elements of the type `object`.

The array object has the following properties:

#### `style` (string, enum)

This element must be one of the following enum values:

* `block`
* `inline`

Default: `"inline"`