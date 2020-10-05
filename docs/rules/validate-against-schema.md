## Validate GraphQL operation against schema

- Name: `validate-against-schema`
- Requires GraphQL Schema: `true`

This rule validates GraphQL operations against your GraphQL schema, and reflects the error as lint errors.

> Super useful with VSCode integration!

The default set of validation rules is defined by GraphQL `validate` method ([list of rules](https://github.com/graphql/graphql-js/blob/master/src/validation/specifiedRules.js#L100-L128)).

You can configure the rules by overriding it, or ignoring rules from the default set.

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

## Configuration

By default, the [default set of validation rules](https://github.com/graphql/graphql-js/blob/master/src/validation/specifiedRules.js#L100-L128) is being executed. You can change that if you wish.

#### Overriding the entire list of rules

If you wish to override the entire list of rules, you can specify `overrideRules` key in your configuration:

```js
// This will run only UniqueDirectivesPerLocationRule rule
{
  rules: {
     '@graphql-eslint/validate-against-schema': ["error", {
       overrideRules: ["UniqueDirectivesPerLocationRule"]
     }]
  }
}
```

> Just use the name of the rule, as it specified by the list of available rules in `graphql-js` library.

#### Disable specific rules

If you wish to use the default list of rules, and just disable some of them, you can use the following:

```js
// This will use the default list of rules, but will disable only KnownDirectivesRule
{
  rules: {
     '@graphql-eslint/validate-against-schema': ["error", {
       disableRules: ["KnownDirectivesRule"]
     }]
  }
}
```
