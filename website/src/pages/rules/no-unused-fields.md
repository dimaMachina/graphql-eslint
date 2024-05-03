# `no-unused-fields`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-unused-fields`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Requires all fields to be used at some level by siblings operations.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-unused-fields: 'error'

type User {
  id: ID!
  name: String
  someUnusedField: String
}

type Query {
  me: User
}

query {
  me {
    id
    name
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-unused-fields: 'error'

type User {
  id: ID!
  name: String
}

type Query {
  me: User
}

query {
  me {
    id
    name
  }
}
```

### Correct (ignoring fields)

```graphql
# eslint @graphql-eslint/no-unused-fields: ['error', { ignoredFieldSelectors: ['FieldDefinition[name.value=lastName]'] }]

type User {
  id: ID!
  firstName: String
  lastName: String
}

type Query {
  me: User
}

query {
  me {
    id
    firstName
  }
}
```

## Config Schema

The schema defines the following properties:

### `ignoredFieldSelectors` (array)

Fields that will be ignored and are allowed to be unused.

> These fields are defined by ESLint
> [`selectors`](https://eslint.org/docs/developer-guide/selectors) . Paste or drop code into the
> editor in [ASTExplorer](https://astexplorer.net) and inspect the generated AST to compose your
> selector.

The object is an array with all elements of the type `string`.

Additional restrictions:

- Minimum items: `1`
- Unique items: `true`

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-unused-fields.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-unused-fields.spec.ts)
