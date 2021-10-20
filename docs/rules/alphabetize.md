# `alphabetize`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/alphabetize`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation selections and more.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { fields: ['ObjectTypeDefinition'] }]

type User {
  password: String
  firstName: String! # should be before "password"
  age: Int # should be before "firstName"
  lastName: String!
}
```

### Correct

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { fields: ['ObjectTypeDefinition'] }]

type User {
  age: Int
  firstName: String!
  lastName: String!
  password: String
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { values: ['EnumTypeDefinition'] }]

enum Role {
  SUPER_ADMIN
  ADMIN # should be before "SUPER_ADMIN"
  USER
  GOD # should be before "USER"
}
```

### Correct

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { values: ['EnumTypeDefinition'] }]

enum Role {
  ADMIN
  GOD
  SUPER_ADMIN
  USER
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { selections: ['OperationDefinition'] }]

query {
  me {
    firstName
    lastName
    email # should be before "lastName"
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { selections: ['OperationDefinition'] }]

query {
  me {
    email
    firstName
    lastName
  }
}
```

## Config Schema

The schema defines the following properties:

### `fields` (array)

Fields of `type`, `interface`, and `input`.

The elements of the array must contain the following properties:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `InputObjectTypeDefinition`

### `values` (array)

Values of `enum`.

The elements of the array must contain the following properties:

- `EnumTypeDefinition`

### `selections` (array)

Selections of operations (`query`, `mutation` and `subscription`) and `fragment`.

The elements of the array must contain the following properties:

- `OperationDefinition`
- `FragmentDefinition`

### `variables` (array)

Variables of operations (`query`, `mutation` and `subscription`).

The elements of the array must contain the following properties:

- `OperationDefinition`

### `arguments` (array)

Arguments of fields and directives.

The elements of the array must contain the following properties:

- `FieldDefinition`
- `Field`
- `DirectiveDefinition`
- `Directive`