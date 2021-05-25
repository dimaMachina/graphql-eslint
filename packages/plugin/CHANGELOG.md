# @graphql-eslint/eslint-plugin

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

  - [Migration guide and example](https://github.com/dotansimha/graphql-eslint#prettier-rule)
  - [Related PR](https://github.com/dotansimha/graphql-eslint/issues/395)

- 61251e7: BREAKING CHANGE: Remove deprecated rule `validate-against-schema`.

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
