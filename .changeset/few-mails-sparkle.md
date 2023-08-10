---
'@graphql-eslint/eslint-plugin': major
---

- `alphabetize` rule changes

  - add `definitions: true` option for `schema-all`/`operations-all` configs
  - rename `values: ['EnumTypeDefinition']` to `values: true`
  - rename `variables: ['OperationDefinition']` to `variables: true`
  - add `groups: ['id', '*', 'createdAt', 'updatedAt']` for `schema-all`/`operations-all` configs

- `require-id-when-available` rule changes

  - rename rule to `require-selections`

- update `schema-all`/`operations-all` config

- `require-description` rule changes
  - add `rootField: true` option for `schema-recommended` config
