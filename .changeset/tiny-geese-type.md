---
'@graphql-eslint/eslint-plugin': patch
---

fix race condition of loading `loadGraphQLConfig()` when `processor.preprocess()` can be called before `parseForESLint()`
