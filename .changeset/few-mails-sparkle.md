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

- update `schema-all`/`operations-all` configs

- `require-description` rule changes

  - add `rootField: true` option for `schema-recommended` config

- require `eslint` at least `>=8.44.0` as peerDependency

- `naming-convention`

  - add new options for `schema-recommended` config

  ```json5
  {
    'EnumTypeDefinition,EnumTypeExtension': {
      forbiddenPrefixes: ['Enum'],
      forbiddenSuffixes: ['Enum']
    },
    'InterfaceTypeDefinition,InterfaceTypeExtension': {
      forbiddenPrefixes: ['Interface'],
      forbiddenSuffixes: ['Interface']
    },
    'UnionTypeDefinition,UnionTypeExtension': {
      forbiddenPrefixes: ['Union'],
      forbiddenSuffixes: ['Union']
    },
    'ObjectTypeDefinition,ObjectTypeExtension': {
      forbiddenPrefixes: ['Type'],
      forbiddenSuffixes: ['Type']
    }
  }
  ```

- remove graphql-js' `unique-enum-value-names` rule

- rename `no-case-insensitive-enum-values-duplicates` to `unique-enum-value-names`

  > Since this rule reports case-insensitive enum values duplicates too

- `require-nullable-result-in-root` rule changes

  Do not check subscriptions
