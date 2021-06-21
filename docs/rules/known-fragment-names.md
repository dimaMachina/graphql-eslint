# `known-fragment-names`

- Category: `Validation`
- Rule name: `@graphql-eslint/known-fragment-names`
- Requires GraphQL Schema: `true` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document.

> This rule is a wrapper around a `graphql-js` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/KnownFragmentNamesRule.ts).

## Usage Examples

### Incorrect (fragment not defined in the document)

```graphql
# eslint @graphql-eslint/known-fragment-names: ["error"]

query {
  user {
    id
    ...UserFields
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/known-fragment-names: ["error"]

fragment UserFields on User {
  firstName
  lastName
}

query {
  user {
    id
    ...UserFields
  }
}
```

### Correct (existing import to UserFields fragment)

```graphql
# eslint @graphql-eslint/known-fragment-names: ["error"]

#import '../UserFields.gql'

query {
  user {
    id
    ...UserFields
  }
}
```