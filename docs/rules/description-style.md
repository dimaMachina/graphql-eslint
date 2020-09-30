# Enforce style of the description comments

- Name: `description-style`
- Requires GraphQL Schema: `false`

Following the same style for description comments in your code will make them easier to read.

## Rule Details

This rule enforces same style for all description comments in your code. This rule has one option: `style` that can be set to either `block` or `inline` (default).

Examples of **incorrect** code for this rule:

```graphql
# eslint @graphql-eslint/description-style: ["error", { style: "inline" }]

""" Description """
type someTypeName {
    ...
}
```

Examples of **correct** code for this rule:

```graphql
# eslint @graphql-eslint/description-style: ["error", { style: "inline" }]

" Description "
type SomeTypeName {
  someFieldName: String
}
```

## Options

This rule accepts configuration object with one option:

- `style: 'block'|'inline'` - Will require all comments to be either in block style (`"""`) or inline style (`"`)
