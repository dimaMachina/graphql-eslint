# `strict-id-in-types`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/strict-id-in-types`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Requires output types to have one unique identifier unless they do not have a logical one. Exceptions can be used to ignore output types that do not have unique identifiers.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/strict-id-in-types: ['error', { acceptedIdNames: ['id', '_id'], acceptedIdTypes: ['ID'], exceptions: { suffixes: ['Payload'] } }]

# Incorrect field name
type InvalidFieldName {
  key: ID!
}

# Incorrect field type
type InvalidFieldType {
  id: String!
}

# Incorrect exception suffix
type InvalidSuffixResult {
  data: String!
}

# Too many unique identifiers. Must only contain one.
type InvalidFieldName {
  id: ID!
  _id: ID!
}
```

### Correct

```graphql
# eslint @graphql-eslint/strict-id-in-types: ['error', { acceptedIdNames: ['id', '_id'], acceptedIdTypes: ['ID'], exceptions: { types: ['Error'], suffixes: ['Payload'] } }]

type User {
  id: ID!
}

type Post {
  _id: ID!
}

type CreateUserPayload {
  data: String!
}

type Error {
  message: String!
}
```

## Config Schema

### (array)

The schema defines an array with all elements of the type `object`.

The array object has the following properties:

#### `acceptedIdNames` (array)

The object is an array with all elements of the type `string`.

Default:

```
[
  "id"
]
```

#### `acceptedIdTypes` (array)

The object is an array with all elements of the type `string`.

Default:

```
[
  "ID"
]
```

#### `exceptions` (object)

Properties of the `exceptions` object:

##### `types` (array)

This is used to exclude types with names that match one of the specified values.

The object is an array with all elements of the type `string`.

Default:

```
[]
```

##### `suffixes` (array)

This is used to exclude types with names with suffixes that match one of the specified values.

The object is an array with all elements of the type `string`.

Default:

```
[]
```