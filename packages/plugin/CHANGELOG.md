# @graphql-eslint/eslint-plugin

## 3.11.2

### Patch Changes

- [#1170](https://github.com/B2o5T/graphql-eslint/pull/1170) [`0b8acdc`](https://github.com/B2o5T/graphql-eslint/commit/0b8acdc64cae77e7b09597dccdcb2b5c38ff3b6e) Thanks [@B2o5T](https://github.com/B2o5T)! - fix race condition of loading `loadGraphQLConfig()` when `processor.preprocess()` can be called before `parseForESLint()`

## 3.11.1

### Patch Changes

- [#1168](https://github.com/B2o5T/graphql-eslint/pull/1168) [`9bc4e1b`](https://github.com/B2o5T/graphql-eslint/commit/9bc4e1b707439fb35fe4948a02f68bafc452bd8b) Thanks [@B2o5T](https://github.com/B2o5T)! - return code as-is in `preprocess` in case of parsing error, sort eslint/graphql-eslint errors in `postprocess` by line/column

- [#1165](https://github.com/B2o5T/graphql-eslint/pull/1165) [`eab5492`](https://github.com/B2o5T/graphql-eslint/commit/eab54927a327f1d8c0c9e30428da38884add4d32) Thanks [@B2o5T](https://github.com/B2o5T)! - fix race condition of `loadGraphQLConfig()`

- [#1167](https://github.com/B2o5T/graphql-eslint/pull/1167) [`2f6c02f`](https://github.com/B2o5T/graphql-eslint/commit/2f6c02fe201b307fc8261d7fb0ac783a5586e66d) Thanks [@B2o5T](https://github.com/B2o5T)! - make `RuleDocsInfo` type optional

## 3.11.0

### Minor Changes

- [#1156](https://github.com/B2o5T/graphql-eslint/pull/1156) [`6ac42cf`](https://github.com/B2o5T/graphql-eslint/commit/6ac42cfe59e77c07fde8ba7d1623c4a1677af221) Thanks [@JimmyPaolini](https://github.com/JimmyPaolini)! - Using configuration options for `graphql-tag-pluck` through `graphql-config`
  Allow setup custom `globalGqlIdentifierName`, `modules.identifier` and `gqlMagicComment`

- [#1163](https://github.com/B2o5T/graphql-eslint/pull/1163) [`0d3fe5b`](https://github.com/B2o5T/graphql-eslint/commit/0d3fe5b1f021ed687e4285bd44f14f98a4287020) Thanks [@B2o5T](https://github.com/B2o5T)! - improve `RuleDocsInfo` type, set `description` and `url` as required fields

## 3.10.7

### Patch Changes

- b6de7ff: fix(GraphQLRuleTester): provide output field for `GraphQLInvalidTestCase` type

## 3.10.6

### Patch Changes

- 39ab684: fix(alphabetize): should not fail when selection is aliased

## 3.10.5

### Patch Changes

- 712a8fe: fix(selection-set-depth): fix `TypeError` from ESLint suggestions, don't provide suggestions for fragment that can be in a separate file
- 01421ae: fix(no-unreachable-types): ignore directives with Request Definitions locations

## 3.10.4

### Patch Changes

- 5593891: fix(known-directives): support `ignoreClientDirectives` for `OperationDefinition`

## 3.10.3

### Patch Changes

- 8a3b584: fix broken report highlighting when processor is used

## 3.10.2

### Patch Changes

- daa04bb: feat: support select `id` field with an alias in `require-id-when-available` rule
- 2efc772: fix: processor should always return code string in preprocess method

## 3.10.1

### Patch Changes

- cf687a5: [relay-page-info]: allow nullable `startCursor` and `endCursor` if there are no results

## 3.10.0

### Minor Changes

- 7251269: feat: new rule `relay-connection-types`
- 7251269: feat: new rule `relay-edge-types`
- 7251269: feat: new rule `relay-page-info`
- 7251269: feat: new rule `relay-arguments`
- 7251269: feat: new config `plugin:@graphql-eslint/relay`
- 7251269: fix: adjust suggestion fix location for code-files
- edbec90: feat: update `graphql-config` to fix loading schema via url

### Patch Changes

- 4bcee4a: fix: surface the original error while loading schema in ESLint server
- 4bcee4a: fix: clarify error message for outdated version of `graphql` package
- 3e821de: fix: allow single letter for snake_case and UPPER_CASE in `naming-convention` rule

Special thanks to @connorjs

## 3.9.1

### Patch Changes

- 56d6ff3: [known-fragment-names]: fix when fragment used on interface and union
- 3fe3761: print debug information with `DEBUG` env variable, example `DEBUG=graphql-eslint:* eslint .`

## 3.9.0

### Minor Changes

- 9c575c6: feat: add `definitions` option for `alphabetize` rule
- bcbda42: feat: add suggestions for `require-id-when-available`, `require-deprecation-date`, `no-deprecated` and `no-scalar-result-type-on-mutation` rules
- 1f697f0: feat: add suggestions for `no-duplicate-fields`, `no-hashtag-description` and `selection-set-depth` rules
- db22ba5: feat: add suggestions for `no-typename-prefix`, `no-root-type`, `no-case-insensitive-enum-values-duplicates` rules
- b04a8d5: feat: add `ignoreClientDirectives` option for `known-directives` rule
- 63c5c78: feat: add suggestions for `description-style`, `input-name` and `no-anonymous-operations` rules

### Patch Changes

- 58b5bfd: fix: false negative case when nested fragments used in `require-id-when-available` rule
- 2cbaa60: fix: check nested selections in fragments in `require-id-when-available` rule
- d9386ad: fix autofix sort for variables in `alphabetize` rule

## 3.8.0

### Minor Changes

- 0da135f: feat: add new option `OperationDefinition` in `require-description` rule
- 1729313: feat: add autofix for `alphabetize` rule and change sort order to lexicographic
- d9bdbd3: feat: add new style `matchDocumentStyle` for `match-document-filename` rule

### Patch Changes

- 7a5ebe0: fix error in `no-unreachable-types` rule on graphql@16.3.0
- af22d9d: chore: clarify report message for `require-description` rule
- 1729313: fix ESTree parser, convert `loc.column` to 0-based column number

## 3.7.0

### Minor Changes

- 6f8c3b6: fix: find graphqlrc files relative to linted file

## 3.6.0

### Minor Changes

- 624d604: fix: ignore root types in `strict-id-in-types` rule

## 3.5.0

### Minor Changes

- cc9a561: feat: ignore fragments in `require-id-when-available` rule

## 3.4.0

### Minor Changes

- 75ec7d1: fix false positive case in `possible-type-extension` rule when schema is separate into multiple files

## 3.3.0

### Minor Changes

- b4c5d55: feat: add new option ignorePattern for `naming-convention` rule
- f20f7de: feat: remove the need of `#import` comments in favor of `parserOptions.operations`

## 3.2.0

### Minor Changes

- 2c73cb7: feat: add suggestions for `naming-convention` rule
- 11b3af6: feat: support multiple id field names in `require-id-when-available` rule

### Patch Changes

- 503dd9f: fix error report location for `graphql-js` rules
- 9378d24: Fix exports in package.json for react-native projects

## 3.1.0

### Minor Changes

- 37c1579: feat: convert fix to suggestions in `no-unreachable-types` and `no-unused-fields` rules

### Patch Changes

- 988e445: fix: ignore operations and fragments in `no-hashtag-description` rule

## 3.0.1

### Patch Changes

- 32ec2cb: fix: ignore arguments in `require-field-of-type-query-in-mutation-result` rule
- 5a259ce: chore: remove `unique-enum-value-names` rule from recommended config
- 36d5334: fix: ignore arguments in `no-scalar-result-type-on-mutation` rule

## 3.0.0

### Major Changes

- a69f0be: ❗ BREAKING CHANGE ❗

  Split `recommended` config to 2 modes: "schema" and "operations".

  > This was done in order to use `recommended` and `all` configs in `schema-only` projects where it is not possible to provide operations.

  `recommended` and `all` configs were divided to 4 configs:

  - `schema-recommended` - enables recommended rules for schema (SDL) development
  - `schema-all` - enables all rules for schema (SDL) development
  - `operations-recommended` - enables recommended rules for consuming GraphQL (operations) development
  - `operations-all` - enables all rules for consuming GraphQL (operations) development

  If you are migrating from v2 where `recommended` was introduced, please change the following:

  ```diff
  {
    "overrides": [
      {
        "files": ["*.js"],
        "processor": "@graphql-eslint/graphql"
      },
      {
        "files": ["*.graphql"],
  -     "extends": "plugin:@graphql-eslint/recommended"
  +     "extends": "plugin:@graphql-eslint/schema-recommended"
      }
    ]
  }
  ```

  > If you are in a project that develops the GraphQL schema, you'll need `schema` rules.

  > If you are in a project that develops GraphQL operations (query/mutation/subscription), you'll need `operations` rules.

  > If you are in a monorepo project, you probably need both sets of rules.

- a69f0be: ❗ BREAKING CHANGE ❗

  feat: `description-style` now have default description style `block`.

- a69f0be: ❗ BREAKING CHANGE ❗

  feat: remove `query` option in `no-root-type` as it's impossible to have write-only schema.

- a69f0be: ❗ BREAKING CHANGE ❗

  - rename `avoid` prefix in rules to `no`.
  - remove `avoid-operation-name-prefix` and `no-operation-name-suffix`

  All rules that had a `avoid` prefix now have a `no` prefix.

  Rules `avoid-operation-name-prefix` and `no-operation-name-suffix` were removed because the same things can be validated by `naming-convention` rule.

  ### Before

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

  ### After

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

- a69f0be: ❗ BREAKING CHANGE ❗

  feat: add new options for `naming-convention` rule

  Options for `naming-convention` are changed. New option `types` includes the following kinds:

  - `ObjectTypeDefinition`
  - `InterfaceTypeDefinition`
  - `EnumTypeDefinition`
  - `ScalarTypeDefinition`
  - `InputObjectTypeDefinition`
  - `UnionTypeDefinition`

  Added new options:

  - `Argument`
  - `DirectiveDefinition`
  - `VariableDefinition`

  Option `QueryDefinition` was removed in favor of `AST` specific selector `FieldDefinition[parent.name.value=Query]`.

  ### Before

  ```json
  {
    "@graphql-eslint/naming-convention": [
      "error",
      {
        "ObjectTypeDefinition": "PascalCase",
        "InterfaceTypeDefinition": "PascalCase",
        "EnumTypeDefinition": "PascalCase",
        "ScalarTypeDefinition": "PascalCase",
        "InputObjectTypeDefinition": "PascalCase",
        "UnionTypeDefinition": "PascalCase",
        "FieldDefinition": "camelCase",
        "InputValueDefinition": "camelCase",
        "QueryDefinition": {
          "forbiddenPrefixes": ["get"]
        },
        "leadingUnderscore": "allow",
        "trailingUnderscore": "allow"
      }
    ]
  }
  ```

  ### After

  ```json
  {
    "@graphql-eslint/naming-convention": [
      "error",
      {
        "types": "PascalCase",
        "FieldDefinition": "camelCase",
        "InputValueDefinition": "camelCase",
        "FieldDefinition[parent.name.value=Query]": {
          "forbiddenPrefixes": ["get"]
        },
        "allowLeadingUnderscore": true,
        "allowTrailingUnderscore": true
      }
    ]
  }
  ```

- a69f0be: ❗ BREAKING CHANGE ❗

  feat: add new options for `require-description` rule

  Options for `require-description` are changed. New option `types` includes the following kinds:

  - `ObjectTypeDefinition`
  - `InterfaceTypeDefinition`
  - `EnumTypeDefinition`
  - `ScalarTypeDefinition` (new in v3)
  - `InputObjectTypeDefinition`
  - `UnionTypeDefinition`

  ### Before

  ```json
  {
    "@graphql-eslint/require-description": [
      "error",
      {
        "on": [
          "ObjectTypeDefinition",
          "InterfaceTypeDefinition",
          "EnumTypeDefinition",
          "InputObjectTypeDefinition",
          "UnionTypeDefinition",
          "FieldDefinition",
          "InputValueDefinition",
          "EnumValueDefinition",
          "DirectiveDefinition"
        ]
      }
    ]
  }
  ```

  ### After

  ```json
  {
    "@graphql-eslint/require-description": [
      "error",
      {
        "types": true,
        "FieldDefinition": true,
        "InputValueDefinition": true,
        "EnumValueDefinition": true,
        "DirectiveDefinition": true
      }
    ]
  }
  ```

## 2.5.0

### Minor Changes

- 64c302c: feat: add new rule `no-root-type`
- c837c99: fix false positive case in `no-unreachable-types` rule when directive on root schema is used
- 1914d6a: fix false positive case in `known-fragment-names` when import nested fragment

### Patch Changes

- 4c29de7: fix: make works graphql-eslint in yarn berry

## 2.4.1

### Patch Changes

- dc29c27: update graphql-js peer dependency range

## 2.4.0

### Minor Changes

- 81fae5a: GraphQL v16 support

## 2.3.2

### Patch Changes

- 86b3709: fix error report for `no-unused-fields` and `no-unreachable-types` rule
- cf3cc4f: fix error report for `require-deprecation-reason` and `require-field-of-type-query-in-mutation-result` rule
- 578b890: fix error report for `require-deprecation-date` rule
- ebab010: fix error report for `alphabetize` rule
- 7dacfe5: fix error report for `avoid-scalar-result-type-on-mutation` rule
- f712780: fix error report for `unique-fragment-name` and `unique-operation-name` rule
- d081fcc: fix error report for `selection-set-depth` rule and for `graphql-js` rules
- 46f03f7: fix error report for `description-style` rule
- b36a32c: fix error report for `strict-id-in-types` and `naming-convention` rule
- 7aa8157: fix error report for `input-name` rule
- a285de3: fix error report for `require-deprecation-reason` and `require-field-of-type-query-in-mutation-result` rule
- ced6789: fix error report for `no-deprecated` rule

## 2.3.1

### Patch Changes

- 98b6bcb: fix: adjust report location for `no-operation-name-suffix` rule
- 1bacedd: fix: adjust report location for `no-anonymous-operations` rule
- c42cee5: fix: adjust report location for `avoid-typename-prefix` rule
- eb4a851: fix: adjust report location for `require-description` rule

## 2.3.0

### Minor Changes

- f2a6635: add new rule `require-field-of-type-query-in-mutation-result`
- 44a6c73: fix false negative case for `no-undefined-variables` rule
- ed6644b: feat: support ESLint 8
- f713823: fix false positive case for `no-unused-variables` rule
- c7a8b33: add new rule `alphabetize`

## 2.2.0

### Minor Changes

- 1dd2f43: feat: add recommended and all configs
- 1dd2f43: add new rule require-deprecation-date
- 1dd2f43: add new rule avoid-scalar-result-type-on-mutation

## 2.1.0

### Minor Changes

- c6886ba: [New rule] Compare operation/fragment name to the file name
- 2032a66: fix `no-unreachable-types` rule when interface implementing other interface

### Patch Changes

- c6886ba: NEW PLUGIN: Compare operation/fragment name to the file name
- 7b12bbf: fix(no-hashtag-description): allow hashtag comments between fields and arguments

## 2.0.2

### Patch Changes

- 403b946: enhance(eslint-plugin): refactor the parts using tools

## 2.0.1

### Patch Changes

- 0fb8d51: Update range of graphql-config and graphql-tools to fix documents loading issues

## 2.0.0

### Major Changes

- 17014ee: Drop support for Node 10, update to latest graphql-tools

### Patch Changes

- c0b12a5: fix(siblings): return virtual path for code files instead of real path
- 3701b2a: use `graphql-config` even there is no `graphql-config` consmiconfig file
- 44f0d73: fix false negative cases for `no-unreachable-types` rule
- 5065482: fix caching for `no-unreachable-types` and `no-unused-fields` rules
- 5e8ebd8: add tests for schema loaders

## 1.1.4

### Patch Changes

- 34b4300: fix(graphql-config): pass real filepath to `gqlConfig.getProjectForFile`

## 1.1.3

### Patch Changes

- ca8b521: fix: code filepath in unique-fragment-name and unique-operation-name rules

## 1.1.2

### Patch Changes

- e7d8496: fix: documents in graphql-config can be null

## 1.1.1

### Patch Changes

- f428d46: feat: improve generate-docs and types
- 5a7e9a7: fix comments in files that contains import comments
- 4348dcc: update eslint, various improvements
- 01ade2e: fix unique-fragment-name and no-unused-fragments rule

## 1.1.0

### Minor Changes

- a44d426: support #import in known-fragment-names rule

## 1.0.2

### Patch Changes

- 85d842e: add `no-unused-fields` rule
- 6b5b90b: graphql-js migrate to .ts, fix links
- f0560b0: Fix for missing exports for testkit

## 1.0.1

### Patch Changes

- 1d85025: fix: allow anonymous operations for naming-convention rule
- a92267b: fixes for graphql-js rules issues
- 45acfde: Fix console.warn typo in selection-set-depth rule
- 533d123: Fix issues with Windows paths

## 1.0.0

### Major Changes

- 14211d6: feat: remove `prettier` rule, add related docs

  ### BREAKING CHANGE: Remove `prettier` Rule

  Since prettier itself support now linting GraphQL code and syntax, we removed the need for this rule from this package.

  For more information, see:

  - [Migration guide and example](https://github.com/B2o5T/graphql-eslint#prettier-rule)
  - [Related PR](https://github.com/B2o5T/graphql-eslint/issues/395)

- 61251e7: BREAKING CHANGE: Remove deprecated rule `validate-against-schema`.

  ### BREAKING CHANGE: Remove deprecated rule `validate-against-schema`.

  If you are using `validate-against-schema`, please remove it and specify the exact rules that you need.

  As a drop-in replacement for the whole set of rules we had in `validate-against-schema`, you can use this:

```
      "@graphql-eslint/executable-definitions": "error",
      "@graphql-eslint/fields-on-correct-type": "error",
      "@graphql-eslint/fragments-on-composite-type": "error",
      "@graphql-eslint/known-argument-names": "error",
      "@graphql-eslint/known-directives": "error",
      "@graphql-eslint/known-fragment-names": "error",
      "@graphql-eslint/known-type-names": "error",
      "@graphql-eslint/lone-anonymous-operation": "error",
      "@graphql-eslint/lone-schema-definition": "error",
      "@graphql-eslint/no-fragment-cycles": "error",
      "@graphql-eslint/no-undefined-variables": "error",
      "@graphql-eslint/no-unused-fragments": "error",
      "@graphql-eslint/no-unused-variables": "error",
      "@graphql-eslint/overlapping-fields-can-be-merged": "error",
      "@graphql-eslint/possible-fragment-spread": "error",
      "@graphql-eslint/possible-type-extension": "error",
      "@graphql-eslint/provided-required-arguments": "error",
      "@graphql-eslint/scalar-leafs": "error",
      "@graphql-eslint/one-field-subscriptions": "error",
      "@graphql-eslint/unique-argument-names": "error",
      "@graphql-eslint/unique-directive-names": "error",
      "@graphql-eslint/unique-directive-names-per-location": "error",
      "@graphql-eslint/unique-enum-value-names": "error",
      "@graphql-eslint/unique-field-definition-names": "error",
      "@graphql-eslint/unique-input-field-names": "error",
      "@graphql-eslint/unique-operation-types": "error",
      "@graphql-eslint/unique-type-names": "error",
      "@graphql-eslint/unique-variable-names": "error",
      "@graphql-eslint/value-literals-of-correct-type": "error",
      "@graphql-eslint/variables-are-input-types": "error",
      "@graphql-eslint/variables-in-allowed-position": "error"
```

- 61251e7: Bump dependencies and update minimum Node version to `v12`

### Minor Changes

- 63dc00a: NEW RULE: avoid-typename-prefix

### Patch Changes

- 9a40163: Fix issues with `avoid-operation-name-prefix` and error with caseSensitive
- 1257d51: fix: original file should not be considered as file block

  Related #88

  ESLint supports `text` directly, no need to use the hacky way. See https://github.com/eslint/eslint/blob/master/lib/linter/linter.js#L1298

  Related `eslint-plugin-prettier`'s issue hae been fixed at https://github.com/prettier/eslint-plugin-prettier/pull/401

- 6d4a356: Fix loadSiblings file location
- 388a0bf: Support OperationDefinition in naming-convention rule
- 5ff184b: Fix issues with `lone-schema-definition` rule
- 7a04e1e: Added support for direcrives in `no-unreachable-types` rule
- ef8d776: Fix errors always thrown with unique-type-names rule

## 0.9.1

### Patch Changes

- beb3b14: Support possible types in no-unreachable-types rule

## 0.9.0

### Minor Changes

- 4693f27: [New rule] strict-id-in-types: use this to enforce output types to have a unique indentifier field unless being in exceptions

## 0.8.1

### Patch Changes

- 46742f0: no-hashtag-description allows eslint directives
- 77eafd2: no-unreachable-types pass if type implements reachable interface
- 13fd2fa: Fix compatibility issues with graphql v14

## 0.8.0

### Minor Changes

- 5b35139: Add options to input-name rule.
- 46d759e: [naming-convention] Add forbiddenPrefixes and forbiddenSuffixes options. Add QueryDefinition which targets queries ( may break existing config if FieldDefinition is used )

### Patch Changes

- 619d9eb: fix for `no-unreachable-types` does not recognize implemented interfaces
- 2f6313b: Fix issues with built artifact containing parts of graphql-js library

## 0.7.2

### Patch Changes

- 80f9090: Fix missing "no-unreachable-types"

## 0.7.1

### Patch Changes

- a5e1e6e: Fix issues with processor parsing errors breaking the eslint execution

## 0.7.0

### Minor Changes

- 5e1bbe6: NEW RULE: avoid-duplicate-fields
- b093f88: NEW RULE: selection-set-depth
- 2df9134: NEW RULE: no-hashtag-description
- 625f083: New rule: no-unreachable-types
- 174a66f: [naming-convention] Allow each definition to take either a strng or object. Object can take the following keys: style (naming style), prefix (value must have prefix) and suffix (value must have suffix)
- d3ff768: NEW RULE: no-deprecated
- 63cecdd: Added code file compatibility for graphql-config projects

### Patch Changes

- 0094548: Load graphql config file only once
- e26a5d4: Fix issues with loading schemas from code-files
- e6edc88: Added prefix to error thrown by the parser
- 1594288: Improve error messages for parserServices
- 4942b58: Optimisation of sibling operations loading (cache by project)
- 2df9134: Fixed missing `loc` property when rawNode is called on Document node
- a57d4f5: fix(naming-convention): fix issues with numeric values

## 0.6.0

### Minor Changes

- e9d1d53: NEW RULE: unique-operation-name
- e9d1d53: Port all graphql-js validation rules to standalone rules
- e9d1d53: New rule: unique-fragment-name

### Patch Changes

- e9d1d53: Fix issues with AST converter and root Document causing to invalid ASTs when rawNode is called
- e9d1d53: Fix issue with siblings operations and getOperation method

## 0.5.0

### Minor Changes

- 937b322: test release
- 937b322: Allow to load siblings operations
- 937b322: feature(processor): apply processor automatically on code files

### Patch Changes

- 937b322: Fix processor compatibility with other plugins
- 937b322: Better integration of siblings operations and graphql-config
- 937b322: fix(parser): better performance, make sure schema is loaded and cached
- 937b322: fix(parser): better support for graphql-config intergration and project detection

## 0.4.4

### Patch Changes

- c9bbdbe: Added `supportsAutofix` to the processor.
  Fixes can be applied in JS,TS files now.

## 0.4.3

### Patch Changes

- 0fe0f68: Fix a bug in the input-name rule to make sure it only checks fields on the Mutation type

## 0.4.2

### Patch Changes

- 0dab062: [require-id-when-available] fix for inline fragments on interfaces (#139)

## 0.4.1

### Patch Changes

- 52a98df: Ignore NoUnusedFragmentsRule validation for fragments operations
- 52a98df: Improve error reported from validate-against-schema (added the rule name to the error)

## 0.4.0

### Minor Changes

- 80e922c: Improved `validate-against-schema` rule configuration (allow to customize rules)

### Patch Changes

- 80e922c: Fix issues with `.rawNode()` values

## 0.3.3

### Patch Changes

- 2b87cb1: Fix compatibility with GraphQL v14

## 0.3.2

### Patch Changes

- da77db6: Fix `schemaOptions` support

## 0.3.1

### Patch Changes

- 9f0ab04: Fixes README and missing docs in published package

## 0.3.0

### Minor Changes

- 3838852: Initial minor release from this repo.
- 5809bdc: Fixes for docs and package publish
