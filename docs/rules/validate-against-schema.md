# `validate-against-schema`

- ❗ DEPRECATED ❗
- Rule name: `@graphql-eslint/validate-against-schema`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

This rule validates GraphQL operations against your GraphQL schema, and reflects the error as lint errors.

> This rule is deprecated, all validations are available as standalone rules since v0.6.0.

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