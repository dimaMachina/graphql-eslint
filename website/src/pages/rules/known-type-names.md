---
description:
  "A GraphQL document is only valid if referenced types (specifically variable definitions and
  fragment conditions) are defined by the type schema.\n> This rule is a wrapper around a
  `graphql-js` validation function."
---

# `known-type-names`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` and
`"plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this
rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema & Operations`
- Rule name: `@graphql-eslint/known-type-names`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if referenced types (specifically variable definitions and fragment
conditions) are defined by the type schema.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/KnownTypeNamesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/KnownTypeNamesRule-test.ts)
