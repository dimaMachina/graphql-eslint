---
'@graphql-eslint/eslint-plugin': major
---

feat: rename `avoid` prefix in rules to `no`, remove `avoid-operation-name-prefix`
and `no-operation-name-suffix`

All rules that had a `avoid` prefix now have a `no` prefix. Rules `avoid-operation-name-prefix`
and `no-operation-name-suffix` were removed because the same things can be validated
by `naming-convention` rule.

Before

```json
{
  "@graphql-eslint/avoid-operation-name-prefix": [
    "error",
    {
      "keywords": ["Query", "Mutation", "Subscription", "Get"]
    }
  ],
  "@graphql-eslint/no-operation-name-suffix": "error"
}
```

After

```json
{
  "@graphql-eslint/naming-convention": [
    "error",
    {
      "OperationDefinition": {
        "style": "PascalCase",
        "forbiddenPrefixes": ["Query", "Mutation", "Subscription", "Get"],
        "forbiddenSuffixes": ["Query", "Mutation", "Subscription"]
      }
    }
  ]
}
```
