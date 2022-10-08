---
'@graphql-eslint/eslint-plugin': patch
---

fix passing pluck config via `graphql-config#extensions` field
rename `extensions.graphqlTagPluck` to `extensions.pluckConfig`
fix performance regression while using `processor: '@graphql-eslint/graphql'`
