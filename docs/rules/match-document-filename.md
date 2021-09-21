# `match-document-filename`

- Category: `Best Practices`
- Rule name: `@graphql-eslint/match-document-filename`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

This rule allows you to enforce that the file name should match the operation name.

## Usage Examples

### Correct

```graphql
# eslint @graphql-eslint/match-document-filename: ['error', { fileExtension: '.gql' }]

# user.gql
type User {
  id: ID!
}
```

### Correct

```graphql
# eslint @graphql-eslint/match-document-filename: ['error', { query: 'snake_case' }]

# user_by_id.gql
query UserById {
  userById(id: 5) {
    id
    name
    fullName
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/match-document-filename: ['error', { fragment: { style: 'kebab-case', suffix: '.fragment' } }]

# user-fields.fragment.gql
fragment user_fields on User {
  id
  email
}
```

### Correct

```graphql
# eslint @graphql-eslint/match-document-filename: ['error', { mutation: { style: 'PascalCase', suffix: 'Mutation' } }]

# DeleteUserMutation.gql
mutation DELETE_USER {
  deleteUser(id: 5)
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/match-document-filename: ['error', { fileExtension: '.graphql' }]

# post.gql
type Post {
  id: ID!
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/match-document-filename: ['error', { query: 'PascalCase' }]

# user-by-id.gql
query UserById {
  userById(id: 5) {
    id
    name
    fullName
  }
}
```

## Config Schema

The schema defines the following properties:

### `fileExtension` (string, enum)

This element must be one of the following enum values:

* `.gql`
* `.graphql`

### `query`

The object must be one of the following types:

* `asString`
* `asObject`

### `mutation`

The object must be one of the following types:

* `asString`
* `asObject`

### `subscription`

The object must be one of the following types:

* `asString`
* `asObject`

### `fragment`

The object must be one of the following types:

* `asString`
* `asObject`

---

# Sub Schemas

The schema defines the following additional types:

## `asString` (string)

One of: `camelCase`, `PascalCase`, `snake_case`, `UPPER_CASE`, `kebab-case`

## `asObject` (object)

Properties of the `asObject` object:

### `style` (string, enum)

This element must be one of the following enum values:

* `camelCase`
* `PascalCase`
* `snake_case`
* `UPPER_CASE`
* `kebab-case`