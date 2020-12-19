# `validate-against-schema`

- Rule name: `@graphql-eslint/validate-against-schema`
- Requires GraphQL Schema: `true`
- Requires GraphQL Operations: `false`

This rule validates GraphQL operations against your GraphQL schema, and reflects the error as lint errors.

## Config Schema

### (array)

The elements of the array must match *all* of the following properties:

### `overrideRules` (object)

Properties of the `overrideRules` object:

#### `overrideRules` (array)

The object is an array with all elements of the type `string`.

### `disableRules` (object)

Properties of the `disableRules` object:

#### `disableRules` (array)

The object is an array with all elements of the type `string`.