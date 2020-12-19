# `avoid-operation-name-prefix`

- Category: `Stylistic Issues`
- Rule name: `@graphql-eslint/avoid-operation-name-prefix`
- Requires GraphQL Schema: `false`
- Requires GraphQL Operations: `false`

Enforce/avoid operation name prefix, useful if you wish to avoid prefix in your root fields, or avoid using REST terminology in your schema

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/avoid-operation-name-prefix: ["error", [{"keywords":["get"]}]]

query getUserDetails {
  # ...
}
```

### Correct

```graphql
# eslint @graphql-eslint/avoid-operation-name-prefix: ["error", [{"keywords":["get"]}]]

query userDetails {
  # ...
}
```

## Config Schema

### (array)

The schema defines an array with all elements of the type `object`.

The array object has the following properties:

#### `caseSensitive` (boolean)

Default: `false`

#### `keywords` (array, required)

The object is an array with all elements of the type `string`.

Additional restrictions:

* Minimum items: `1`