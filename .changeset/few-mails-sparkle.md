---
'@graphql-eslint/eslint-plugin': major
---

- `alphabetize` rule changes
  - add `definitions: true` option for `schema-all`/`operations-all` configs
  - rename `values: ['EnumTypeDefinition']` to `values: true`
  - rename `variables: ['OperationDefinition']` to `variables: true`
  - add `groups: ['id', '*', 'createdAt', 'updatedAt']` for `schema-all`/`operations-all` configs

- rename `require-id-when-available` to `require-selections`
