# `alphabetize`

🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically fix some of the problems reported by this rule.

- Category: `Schema & Operations`
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

The elements of the array can contain the following enum values:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `InputObjectTypeDefinition`

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

### `values` (array)

Values of `enum`.

The elements of the array can contain the following enum values:

- `EnumTypeDefinition`

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

### `selections` (array)

Selections of `fragment` and operations `query`, `mutation` and `subscription`.

The elements of the array can contain the following enum values:

- `OperationDefinition`
- `FragmentDefinition`

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

### `variables` (array)

Variables of operations `query`, `mutation` and `subscription`.

The elements of the array can contain the following enum values:

- `OperationDefinition`

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

### `arguments` (array)

Arguments of fields and directives.

The elements of the array can contain the following enum values:

- `FieldDefinition`
- `Field`
- `DirectiveDefinition`
- `Directive`

Additional restrictions:

* Minimum items: `1`
* Unique items: `true`

### `definitions` (boolean)

Definitions – `type`, `interface`, `enum`, `scalar`, `input`, `union` and `directive`.

Default: `false`

## Resources

- [Rule source](../../packages/plugin/src/rules/alphabetize.ts)
- [Test source](../../packages/plugin/tests/alphabetize.spec.ts)
