---
'@graphql-eslint/eslint-plugin': patch
---

- rename flat configs exports

```diff
-graphql.flatConfigs['schema-recommended']
+graphql.configs['flat/schema-recommended']
-graphql.flatConfigs['schema-relay']
+graphql.configs['flat/schema-relay']
-graphql.flatConfigs['schema-all']
+graphql.configs['flat/schema-all']
-graphql.flatConfigs['operations-recommended']
+graphql.configs['flat/operations-recommended']
-graphql.flatConfigs['operations-all']
+graphql.configs['flat/operations-all']
```

- fix with programmatic usage when passing large schema as string causes `pattern too long` error

- fix loading ESM `graphql.config.js` configs
