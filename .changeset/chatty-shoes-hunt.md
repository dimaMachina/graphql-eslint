---
'@graphql-eslint/eslint-plugin': major
---

❗ BREAKING CHANGE ❗

Split `recommended` config to 2 modes: "schema" and "operations". 

> This was done in order to use `recommended` and `all` configs in `schema-only` projects where it is not possible to provide operations.

`recommended` and `all` configs were divided to 4 configs:
* `schema-recommended` - enables recommended rules for schema (SDL) development.
* `schema-all` - enables all recommended rules for schema (SDL) development.
* `operations-recommended` - enables recommended rules for consuming GraphQL (operations) development.
* `operations-all` - enables all rules for consuming GraphQL (operations) development.

If you are migrating from v2 where `recommended` was introdued, please change the following: 

```yaml
{
  "overrides": [
    {
      "files": ["*.js"],
      "processor": "@graphql-eslint/graphql"
    },
    {
      "files": ["*.graphql"],
-     "extends": "plugin:@graphql-eslint/schema",
+     "extends": "plugin:@graphql-eslint/schema-recommended"
    }
  ]
}
```

> If you are in a project that develops the GraphQL schema, you'll need `schema` rules. 

> If you are in a project that develops GraphQL operations (query/mutation/subscription), you'll need `operations` rules.

> If you are in a monorepo project, you probably need both sets of rules.