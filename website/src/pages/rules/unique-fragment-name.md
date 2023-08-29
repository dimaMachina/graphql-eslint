# `unique-fragment-name`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file
enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/unique-fragment-name`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Enforce unique fragment names across your project.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/unique-fragment-name: 'error'

# user.fragment.graphql
fragment UserFields on User {
  id
  name
  fullName
}

# user-fields.graphql
fragment UserFields on User {
  id
}
```

### Correct

```graphql
# eslint @graphql-eslint/unique-fragment-name: 'error'

# user.fragment.graphql
fragment AllUserFields on User {
  id
  name
  fullName
}

# user-fields.graphql
fragment UserFields on User {
  id
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/unique-fragment-name.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/unique-fragment-name.spec.ts)
