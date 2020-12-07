## Avoid Prefix in GraphQL operation name

- Name: `avoid-operation-name-prefix`
- Requires GraphQL Schema: `false`

Allow you to enforce and avoid operation name prefix, useful if you wish to avoid prefix in your root fields,like `getSomething`.

### Usage Example

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/avoid-operation-name-prefix: ["error", { keywords: ["get"] }]

query getUserDetails {
  # ...
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/avoid-operation-name-prefix: ["error", { keywords: ["get"] }]

query userDetails {
  # ...
}
```

### Configuration

- `keywords`: array of prefixes you with to avoid in operation names.
