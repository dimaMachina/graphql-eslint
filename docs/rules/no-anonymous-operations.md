## Avoid Anonymous GraphQL operations

- Name: `no-anonymous-operations`
- Requires GraphQL Schema: `false`

Allow you to require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.

### Usage Example

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/no-anonymous-operations: ["error"]

query {
  # ...
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/no-anonymous-operations: ["error"]

query something {
  # ...
}
```
