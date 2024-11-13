---
'@graphql-eslint/eslint-plugin': major
---

1. graphql plugin can now we specified with

```js
plugins: { '@graphql-eslint': graphqlPlugin },
```

1. config rules now should be specified with accessing `rules` property

```diff
  rules: {
-   ...graphqlESLint.configs['flat/operations-recommended']
+   ...graphqlESLint.configs['flat/operations-recommended'].rules
```

1. processor can now be specified with accessing `processor` property

```js
processor: graphqlPlugin.processor
```

1. plugin can now be imported with default import

```js
import graphqlPlugin from '@graphql-eslint/eslint-plugin'
```
