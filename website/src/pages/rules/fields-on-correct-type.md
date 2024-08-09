---
description:
  'A GraphQL document is only valid if all fields selected are defined by the parent type, or are an
  allowed meta field such as `__typename`.'
---

# `fields-on-correct-type`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file
enables this rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Operations`
- Rule name: `@graphql-eslint/fields-on-correct-type`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

A GraphQL document is only valid if all fields selected are defined by the parent type, or are an
allowed meta field such as `__typename`.

> This rule is a wrapper around a `graphql-js` validation function.

## Resources

- [Rule source](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/FieldsOnCorrectTypeRule.ts)
- [Test source](https://github.com/graphql/graphql-js/tree/main/src/validation/__tests__/FieldsOnCorrectTypeRule-test.ts)
