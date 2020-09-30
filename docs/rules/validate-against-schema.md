## Validate GraphQL operation against schema

- Name: `validate-against-schema`
- Requires GraphQL Schema: `true`

This rule validates GraphQL operations against your GraphQL schema, and reflects the error as lint errors.

> Super useful with VSCode integration!

### Usage Example

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/validate-against-schema: ["error"]

# In your schema
type Query {
  something: String
}

# Query
query somethingElse {
  somethingElse # error, field does not exists
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/validate-against-schema: ["error"]

# In your schema
type Query {
  something: String
}

# Query
query something {
  something # ok, field exists
}
```
