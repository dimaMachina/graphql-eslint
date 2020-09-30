# Require all deprecation directives to specify a reason

- Name: `require-deprecation-reason`
- Requires GraphQL Schema: `false`

Deprecation reason will document your decisions for others.

# Rule Details

This rule will require all `@deprecated` directives to specify deprecation reason

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/require-deprecation-reason: "error"
...
  name: String @deprecated
...
```

```graphql
# eslint @graphql-eslint/require-deprecation-reason: "error"
...
  name: String @deprecated(reason: "")
...
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/require-deprecation-reason: "error"
...
  name: String @depecated(reason: "Removing in 2 releases. Use fullname instead")
...
```
