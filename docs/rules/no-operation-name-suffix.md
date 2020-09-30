## No Operation Name Suffix

- Name: `no-operation-name-suffix`
- Requires GraphQL Schema: `false`

Makes sure you are not adding the operation type to the name of the operation.

### Usage Example

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/no-operation-name-suffix: ["error"]

query userQuery {
  # ...
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/no-operation-name-suffix: ["error"]

query user {
  # ...
}
```
