---
description:
  "A GraphQL field is only valid if all supplied arguments are defined by that field.\n> This rule
  is a wrapper around a `graphql-js` validation function."
---

# `known-argument-names`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` and
`"plugin:@graphql-eslint/operations-recommended"` property in a configuration file enables this
rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema & Operations`
- Rule name: `@graphql-eslint/known-argument-names`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

A GraphQL field is only valid if all supplied arguments are defined by that field.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/KnownArgumentNamesRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/KnownArgumentNamesRule-test.ts)
