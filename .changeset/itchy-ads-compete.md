---
'@graphql-eslint/eslint-plugin': major
---

- remove `parserOptions.schema`
- remove `parserOptions.operations`
- remove `parserOptions.schemaOptions`
- remove `parserOptions.skipGraphQLConfig`

- set `graphql-config` optional peer dependency (not needed in browser)

- add `parserOptions.graphQLConfig?: IGraphQLConfig` for programmatic usage
