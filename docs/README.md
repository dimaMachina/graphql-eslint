## Available Rules

Each rule has emojis denoting:

- 🚀 `graphql-eslint` rule
- 🔮 `graphql-js` rule
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- 💡 if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

<!-- 🚨 IMPORTANT! Do not manually modify this table. Run: `yarn generate:docs` -->
<!-- prettier-ignore-start -->
Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Description|&nbsp;&nbsp;&nbsp;&nbsp;Config&nbsp;&nbsp;&nbsp;&nbsp;|🚀&nbsp;/&nbsp;🔮|🔧&nbsp;/&nbsp;💡
-|-|:-:|:-:|:-:
[alphabetize](rules/alphabetize.md)|Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation selections and more.|![all][]|🚀|🔧
[description-style](rules/description-style.md)|Require all comments to follow the same style (either block or inline).|![recommended][]|🚀|💡
[executable-definitions](rules/executable-definitions.md)|A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.|![recommended][]|🔮|
[fields-on-correct-type](rules/fields-on-correct-type.md)|A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.|![recommended][]|🔮|
[fragments-on-composite-type](rules/fragments-on-composite-type.md)|Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.|![recommended][]|🔮|
[input-name](rules/input-name.md)|Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".|![all][]|🚀|💡
[known-argument-names](rules/known-argument-names.md)|A GraphQL field is only valid if all supplied arguments are defined by that field.|![recommended][]|🔮|
[known-directives](rules/known-directives.md)|A GraphQL document is only valid if all `@directive`s are known by the schema and legally positioned.|![recommended][]|🔮|
[known-fragment-names](rules/known-fragment-names.md)|A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document.|![recommended][]|🔮|
[known-type-names](rules/known-type-names.md)|A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.|![recommended][]|🔮|
[lone-anonymous-operation](rules/lone-anonymous-operation.md)|A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.|![recommended][]|🔮|
[lone-schema-definition](rules/lone-schema-definition.md)|A GraphQL document is only valid if it contains only one schema definition.|![recommended][]|🔮|
[match-document-filename](rules/match-document-filename.md)|This rule allows you to enforce that the file name should match the operation name.|![all][]|🚀|
[naming-convention](rules/naming-convention.md)|Require names to follow specified conventions.|![recommended][]|🚀|💡
[no-anonymous-operations](rules/no-anonymous-operations.md)|Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.|![recommended][]|🚀|💡
[no-case-insensitive-enum-values-duplicates](rules/no-case-insensitive-enum-values-duplicates.md)|Disallow case-insensitive enum values duplicates.|![recommended][]|🚀|💡
[no-deprecated](rules/no-deprecated.md)|Enforce that deprecated fields or enum values are not in use by operations.|![recommended][]|🚀|💡
[no-duplicate-fields](rules/no-duplicate-fields.md)|Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.|![recommended][]|🚀|💡
[no-fragment-cycles](rules/no-fragment-cycles.md)|A GraphQL fragment is only valid when it does not have cycles in fragments usage.|![recommended][]|🔮|
[no-hashtag-description](rules/no-hashtag-description.md)|Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.|![recommended][]|🚀|💡
[no-root-type](rules/no-root-type.md)|Disallow using root types `mutation` and/or `subscription`.||🚀|💡
[no-scalar-result-type-on-mutation](rules/no-scalar-result-type-on-mutation.md)|Avoid scalar result type on mutation type to make sure to return a valid state.|![all][]|🚀|💡
[no-typename-prefix](rules/no-typename-prefix.md)|Enforces users to avoid using the type name in a field name while defining your schema.|![recommended][]|🚀|💡
[no-undefined-variables](rules/no-undefined-variables.md)|A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.|![recommended][]|🔮|
[no-unreachable-types](rules/no-unreachable-types.md)|Requires all types to be reachable at some level by root level fields.|![recommended][]|🚀|💡
[no-unused-fields](rules/no-unused-fields.md)|Requires all fields to be used at some level by siblings operations.||🚀|💡
[no-unused-fragments](rules/no-unused-fragments.md)|A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.|![recommended][]|🔮|
[no-unused-variables](rules/no-unused-variables.md)|A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.|![recommended][]|🔮|
[one-field-subscriptions](rules/one-field-subscriptions.md)|A GraphQL subscription is valid only if it contains a single root field.|![recommended][]|🔮|
[overlapping-fields-can-be-merged](rules/overlapping-fields-can-be-merged.md)|A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.|![recommended][]|🔮|
[possible-fragment-spread](rules/possible-fragment-spread.md)|A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.|![recommended][]|🔮|
[possible-type-extension](rules/possible-type-extension.md)|A type extension is only valid if the type is defined and has the same kind.||🔮|
[provided-required-arguments](rules/provided-required-arguments.md)|A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.|![recommended][]|🔮|
[relay-connection-types](rules/relay-connection-types.md)|Set of rules to follow Relay specification for Connection types.||🚀|
[relay-edge-types](rules/relay-edge-types.md)|Set of rules to follow Relay specification for Edge types.||🚀|
[relay-page-info](rules/relay-page-info.md)|Set of rules to follow Relay specification for `PageInfo` object.||🚀|
[require-deprecation-date](rules/require-deprecation-date.md)|Require deletion date on `@deprecated` directive. Suggest removing deprecated things after deprecated date.|![all][]|🚀|💡
[require-deprecation-reason](rules/require-deprecation-reason.md)|Require all deprecation directives to specify a reason.|![recommended][]|🚀|
[require-description](rules/require-description.md)|Enforce descriptions in type definitions and operations.|![recommended][]|🚀|
[require-field-of-type-query-in-mutation-result](rules/require-field-of-type-query-in-mutation-result.md)|Allow the client in one round-trip not only to call mutation but also to get a wagon of data to update their application.|![all][]|🚀|
[require-id-when-available](rules/require-id-when-available.md)|Enforce selecting specific fields when they are available on the GraphQL type.|![recommended][]|🚀|💡
[scalar-leafs](rules/scalar-leafs.md)|A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.|![recommended][]|🔮|
[selection-set-depth](rules/selection-set-depth.md)|Limit the complexity of the GraphQL operations solely by their depth. Based on [graphql-depth-limit](https://github.com/stems/graphql-depth-limit).|![recommended][]|🚀|💡
[strict-id-in-types](rules/strict-id-in-types.md)|Requires output types to have one unique identifier unless they do not have a logical one. Exceptions can be used to ignore output types that do not have unique identifiers.|![recommended][]|🚀|
[unique-argument-names](rules/unique-argument-names.md)|A GraphQL field or directive is only valid if all supplied arguments are uniquely named.|![recommended][]|🔮|
[unique-directive-names](rules/unique-directive-names.md)|A GraphQL document is only valid if all defined directives have unique names.|![recommended][]|🔮|
[unique-directive-names-per-location](rules/unique-directive-names-per-location.md)|A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.|![recommended][]|🔮|
[unique-enum-value-names](rules/unique-enum-value-names.md)|A GraphQL enum type is only valid if all its values are uniquely named.||🔮|
[unique-field-definition-names](rules/unique-field-definition-names.md)|A GraphQL complex type is only valid if all its fields are uniquely named.|![recommended][]|🔮|
[unique-fragment-name](rules/unique-fragment-name.md)|Enforce unique fragment names across your project.|![all][]|🚀|
[unique-input-field-names](rules/unique-input-field-names.md)|A GraphQL input object value is only valid if all supplied fields are uniquely named.|![recommended][]|🔮|
[unique-operation-name](rules/unique-operation-name.md)|Enforce unique operation names across your project.|![all][]|🚀|
[unique-operation-types](rules/unique-operation-types.md)|A GraphQL document is only valid if it has only one type per operation.|![recommended][]|🔮|
[unique-type-names](rules/unique-type-names.md)|A GraphQL document is only valid if all defined types have unique names.|![recommended][]|🔮|
[unique-variable-names](rules/unique-variable-names.md)|A GraphQL operation is only valid if all its variables are uniquely named.|![recommended][]|🔮|
[value-literals-of-correct-type](rules/value-literals-of-correct-type.md)|A GraphQL document is only valid if all value literals are of the type expected at their position.|![recommended][]|🔮|
[variables-are-input-types](rules/variables-are-input-types.md)|A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).|![recommended][]|🔮|
[variables-in-allowed-position](rules/variables-in-allowed-position.md)|Variables passed to field arguments conform to type.|![recommended][]|🔮|
<!-- prettier-ignore-end -->
[recommended]: https://img.shields.io/badge/-recommended-green.svg
[all]: https://img.shields.io/badge/-all-blue.svg
