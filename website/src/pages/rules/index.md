# Overview

Each rule has emojis denoting:

- 📄 if the rule applies to schema documents
- 📦 if the rule applies to operations
- 🚀 `graphql-eslint` rule
- 🔮 `graphql-js` rule
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix`
  [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- 💡 if some problems reported by the rule are manually fixable by editor
  [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

<!-- 🚨 IMPORTANT! Do not manually modify this table. Run: `yarn generate:docs` -->
<!-- prettier-ignore -->
Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Description|&nbsp;&nbsp;&nbsp;&nbsp;Config&nbsp;&nbsp;&nbsp;&nbsp;|📄&nbsp;/&nbsp;📦|🚀&nbsp;/&nbsp;🔮|🔧&nbsp;/&nbsp;💡
-|-|:-:|:-:|:-:|:-:
[alphabetize](/rules/alphabetize)|Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation selections and more.|![all][]|📄 📦|🚀|🔧
[description-style](/rules/description-style)|Require all comments to follow the same style (either block or inline).|![recommended][]|📄|🚀|💡
[executable-definitions](/rules/executable-definitions)|A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.|![recommended][]|📦|🔮|
[fields-on-correct-type](/rules/fields-on-correct-type)|A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.|![recommended][]|📦|🔮|💡
[fragments-on-composite-type](/rules/fragments-on-composite-type)|Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.|![recommended][]|📦|🔮|
[input-name](/rules/input-name)|Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".|![all][]|📄|🚀|💡
[known-argument-names](/rules/known-argument-names)|A GraphQL field is only valid if all supplied arguments are defined by that field.|![recommended][]|📄 📦|🔮|💡
[known-directives](/rules/known-directives)|A GraphQL document is only valid if all `@directive`s are known by the schema and legally positioned.|![recommended][]|📄 📦|🔮|
[known-fragment-names](/rules/known-fragment-names)|A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document.|![recommended][]|📦|🔮|
[known-type-names](/rules/known-type-names)|A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.|![recommended][]|📄 📦|🔮|💡
[lone-anonymous-operation](/rules/lone-anonymous-operation)|A GraphQL document that contains an anonymous operation (the `query` short-hand) is only valid if it contains only that one operation definition.|![recommended][]|📦|🔮|
[lone-executable-definition](/rules/lone-executable-definition)|Require queries, mutations, subscriptions or fragments to be located in separate files.|![all][]|📦|🚀|
[lone-schema-definition](/rules/lone-schema-definition)|A GraphQL document is only valid if it contains only one schema definition.|![recommended][]|📄|🔮|
[match-document-filename](/rules/match-document-filename)|This rule allows you to enforce that the file name should match the operation name.|![all][]|📦|🚀|
[naming-convention](/rules/naming-convention)|Require names to follow specified conventions.|![recommended][]|📄 📦|🚀|💡
[no-anonymous-operations](/rules/no-anonymous-operations)|Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.|![recommended][]|📦|🚀|💡
[no-deprecated](/rules/no-deprecated)|Enforce that deprecated fields or enum values are not in use by operations.|![recommended][]|📦|🚀|💡
[no-duplicate-fields](/rules/no-duplicate-fields)|Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.|![recommended][]|📦|🚀|💡
[no-fragment-cycles](/rules/no-fragment-cycles)|A GraphQL fragment is only valid when it does not have cycles in fragments usage.|![recommended][]|📦|🔮|
[no-hashtag-description](/rules/no-hashtag-description)|Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.|![recommended][]|📄|🚀|💡
[no-one-place-fragments](/rules/no-one-place-fragments)|Disallow fragments that are used only in one place.|![all][]|📦|🚀|
[no-root-type](/rules/no-root-type)|Disallow using root types `mutation` and/or `subscription`.|![all][]|📄|🚀|💡
[no-scalar-result-type-on-mutation](/rules/no-scalar-result-type-on-mutation)|Avoid scalar result type on mutation type to make sure to return a valid state.|![all][]|📄|🚀|💡
[no-typename-prefix](/rules/no-typename-prefix)|Enforces users to avoid using the type name in a field name while defining your schema.|![recommended][]|📄|🚀|💡
[no-undefined-variables](/rules/no-undefined-variables)|A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.|![recommended][]|📦|🔮|
[no-unreachable-types](/rules/no-unreachable-types)|Requires all types to be reachable at some level by root level fields.|![recommended][]|📄|🚀|💡
[no-unused-fields](/rules/no-unused-fields)|Requires all fields to be used at some level by siblings operations.||📄|🚀|💡
[no-unused-fragments](/rules/no-unused-fragments)|A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.|![recommended][]|📦|🔮|
[no-unused-variables](/rules/no-unused-variables)|A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.|![recommended][]|📦|🔮|
[one-field-subscriptions](/rules/one-field-subscriptions)|A GraphQL subscription is valid only if it contains a single root field.|![recommended][]|📦|🔮|
[overlapping-fields-can-be-merged](/rules/overlapping-fields-can-be-merged)|A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.|![recommended][]|📦|🔮|
[possible-fragment-spread](/rules/possible-fragment-spread)|A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.|![recommended][]|📦|🔮|
[possible-type-extension](/rules/possible-type-extension)|A type extension is only valid if the type is defined and has the same kind.|![recommended][]|📄|🔮|💡
[provided-required-arguments](/rules/provided-required-arguments)|A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.|![recommended][]|📄 📦|🔮|
[relay-arguments](/rules/relay-arguments)|Set of rules to follow Relay specification for Arguments.|![relay][]|📄|🚀|
[relay-connection-types](/rules/relay-connection-types)|Set of rules to follow Relay specification for Connection types.|![relay][]|📄|🚀|
[relay-edge-types](/rules/relay-edge-types)|Set of rules to follow Relay specification for Edge types.|![relay][]|📄|🚀|
[relay-page-info](/rules/relay-page-info)|Set of rules to follow Relay specification for `PageInfo` object.|![relay][]|📄|🚀|
[require-deprecation-date](/rules/require-deprecation-date)|Require deletion date on `@deprecated` directive. Suggest removing deprecated things after deprecated date.|![all][]|📄|🚀|💡
[require-deprecation-reason](/rules/require-deprecation-reason)|Require all deprecation directives to specify a reason.|![recommended][]|📄|🚀|
[require-description](/rules/require-description)|Enforce descriptions in type definitions and operations.|![recommended][]|📄|🚀|
[require-field-of-type-query-in-mutation-result](/rules/require-field-of-type-query-in-mutation-result)|Allow the client in one round-trip not only to call mutation but also to get a wagon of data to update their application.|![all][]|📄|🚀|
[require-import-fragment](/rules/require-import-fragment)|Require fragments to be imported via an import expression.|![all][]|📦|🚀|💡
[require-nullable-fields-with-oneof](/rules/require-nullable-fields-with-oneof)|Require `input` or `type` fields to be non-nullable with `@oneOf` directive.|![all][]|📄|🚀|
[require-nullable-result-in-root](/rules/require-nullable-result-in-root)|Require nullable fields in root types.|![all][]|📄|🚀|💡
[require-selections](/rules/require-selections)|Enforce selecting specific fields when they are available on the GraphQL type.|![recommended][]|📦|🚀|💡
[require-type-pattern-with-oneof](/rules/require-type-pattern-with-oneof)|Enforce types with `@oneOf` directive have `error` and `ok` fields.|![all][]|📄|🚀|
[scalar-leafs](/rules/scalar-leafs)|A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.|![recommended][]|📦|🔮|💡
[selection-set-depth](/rules/selection-set-depth)|Limit the complexity of the GraphQL operations solely by their depth. Based on [graphql-depth-limit](https://npmjs.com/package/graphql-depth-limit).|![recommended][]|📦|🚀|💡
[strict-id-in-types](/rules/strict-id-in-types)|Requires output types to have one unique identifier unless they do not have a logical one. Exceptions can be used to ignore output types that do not have unique identifiers.|![recommended][]|📄|🚀|
[unique-argument-names](/rules/unique-argument-names)|A GraphQL field or directive is only valid if all supplied arguments are uniquely named.|![recommended][]|📦|🔮|
[unique-directive-names](/rules/unique-directive-names)|A GraphQL document is only valid if all defined directives have unique names.|![recommended][]|📄|🔮|
[unique-directive-names-per-location](/rules/unique-directive-names-per-location)|A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.|![recommended][]|📄 📦|🔮|
[unique-enum-value-names](/rules/unique-enum-value-names)|A GraphQL enum type is only valid if all its values are uniquely named.|![recommended][]|📄|🚀|💡
[unique-field-definition-names](/rules/unique-field-definition-names)|A GraphQL complex type is only valid if all its fields are uniquely named.|![recommended][]|📄|🔮|
[unique-fragment-name](/rules/unique-fragment-name)|Enforce unique fragment names across your project.|![recommended][]|📦|🚀|
[unique-input-field-names](/rules/unique-input-field-names)|A GraphQL input object value is only valid if all supplied fields are uniquely named.|![recommended][]|📦|🔮|
[unique-operation-name](/rules/unique-operation-name)|Enforce unique operation names across your project.|![recommended][]|📦|🚀|
[unique-operation-types](/rules/unique-operation-types)|A GraphQL document is only valid if it has only one type per operation.|![recommended][]|📄|🔮|
[unique-type-names](/rules/unique-type-names)|A GraphQL document is only valid if all defined types have unique names.|![recommended][]|📄|🔮|
[unique-variable-names](/rules/unique-variable-names)|A GraphQL operation is only valid if all its variables are uniquely named.|![recommended][]|📦|🔮|
[value-literals-of-correct-type](/rules/value-literals-of-correct-type)|A GraphQL document is only valid if all value literals are of the type expected at their position.|![recommended][]|📦|🔮|💡
[variables-are-input-types](/rules/variables-are-input-types)|A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).|![recommended][]|📦|🔮|
[variables-in-allowed-position](/rules/variables-in-allowed-position)|Variables passed to field arguments conform to type.|![recommended][]|📦|🔮|

[recommended]: https://img.shields.io/badge/-recommended-green.svg
[all]: https://img.shields.io/badge/-all-blue.svg
[relay]: https://img.shields.io/badge/-relay-orange.svg
