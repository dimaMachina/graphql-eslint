# @graphql-eslint/eslint-plugin

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
