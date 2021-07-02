## Available Rules


Each rule has emojis denoting:

* 🚀 `@graphql-eslint` rule
* 🔮 `graphql-js` rule
* 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option

<!-- Do not manually modify this table. Run: `yarn generate:docs` -->
<!-- RULES_TABLE_START -->
| Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description | 🚀&nbsp;/&nbsp;🔮 | 🔧 |
| :-- | :-- | :-- | :-- |
| [avoid-duplicate-fields](rules/avoid-duplicate-fields.md) | Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [avoid-operation-name-prefix](rules/avoid-operation-name-prefix.md) | Enforce/avoid operation name prefix, useful if you wish to avoid prefix in your root fields, or avoid using REST terminology in your schema. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [avoid-typename-prefix](rules/avoid-typename-prefix.md) | Enforces users to avoid using the type name in a field name while defining your schema. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [description-style](rules/description-style.md) | Require all comments to follow the same style (either block or inline). | &nbsp;&nbsp;&nbsp;🚀 |  |
| [executable-definitions](rules/executable-definitions.md) | A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [fields-on-correct-type](rules/fields-on-correct-type.md) | A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [fragments-on-composite-type](rules/fragments-on-composite-type.md) | Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [input-name](rules/input-name.md) | Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". | &nbsp;&nbsp;&nbsp;🚀 |  |
| [known-argument-names](rules/known-argument-names.md) | A GraphQL field is only valid if all supplied arguments are defined by that field. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [known-directives](rules/known-directives.md) | A GraphQL document is only valid if all `@directives` are known by the schema and legally positioned. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [known-fragment-names](rules/known-fragment-names.md) | A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [known-type-names](rules/known-type-names.md) | A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [lone-anonymous-operation](rules/lone-anonymous-operation.md) | A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [lone-schema-definition](rules/lone-schema-definition.md) | A GraphQL document is only valid if it contains only one schema definition. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [naming-convention](rules/naming-convention.md) | Require names to follow specified conventions. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [no-anonymous-operations](rules/no-anonymous-operations.md) | Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [no-case-insensitive-enum-values-duplicates](rules/no-case-insensitive-enum-values-duplicates.md) |  | &nbsp;&nbsp;&nbsp;🚀 | 🔧 |
| [no-deprecated](rules/no-deprecated.md) | This rule allow you to enforce that deprecated fields or enum values are not in use by operations. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [no-fragment-cycles](rules/no-fragment-cycles.md) | A GraphQL fragment is only valid when it does not have cycles in fragments usage. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [no-hashtag-description](rules/no-hashtag-description.md) | Requires to use `"""` or `"` for adding a GraphQL description instead of `#`. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [no-operation-name-suffix](rules/no-operation-name-suffix.md) | Makes sure you are not adding the operation type to the name of the operation. | &nbsp;&nbsp;&nbsp;🚀 | 🔧 |
| [no-undefined-variables](rules/no-undefined-variables.md) | A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [no-unreachable-types](rules/no-unreachable-types.md) | Requires all types to be reachable at some level by root level fields. | &nbsp;&nbsp;&nbsp;🚀 | 🔧 |
| [no-unused-fields](rules/no-unused-fields.md) | Requires all fields to be used at some level by siblings operations. | &nbsp;&nbsp;&nbsp;🚀 | 🔧 |
| [no-unused-fragments](rules/no-unused-fragments.md) | A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [no-unused-variables](rules/no-unused-variables.md) | A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [one-field-subscriptions](rules/one-field-subscriptions.md) | A GraphQL subscription is valid only if it contains a single root field. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [overlapping-fields-can-be-merged](rules/overlapping-fields-can-be-merged.md) | A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [possible-fragment-spread](rules/possible-fragment-spread.md) | A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [possible-type-extension](rules/possible-type-extension.md) | A type extension is only valid if the type is defined and has the same kind. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [provided-required-arguments](rules/provided-required-arguments.md) | A field or directive is only valid if all required (non-null without a default value) field arguments have been provided. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [require-deprecation-reason](rules/require-deprecation-reason.md) | Require all deprecation directives to specify a reason. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [require-description](rules/require-description.md) | Enforce descriptions in your type definitions. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [require-id-when-available](rules/require-id-when-available.md) | This rule allow you to enforce selecting specific fields when they are available on the GraphQL type. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [scalar-leafs](rules/scalar-leafs.md) | A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [selection-set-depth](rules/selection-set-depth.md) | Limit the complexity of the GraphQL operations solely by their depth. Based on [graphql-depth-limit](https://github.com/stems/graphql-depth-limit). | &nbsp;&nbsp;&nbsp;🚀 |  |
| [strict-id-in-types](rules/strict-id-in-types.md) | Requires output types to have one unique identifier unless they do not have a logical one. Exceptions can be used to ignore output types that do not have unique identifiers. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [unique-argument-names](rules/unique-argument-names.md) | A GraphQL field or directive is only valid if all supplied arguments are uniquely named. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-directive-names](rules/unique-directive-names.md) | A GraphQL document is only valid if all defined directives have unique names. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-directive-names-per-location](rules/unique-directive-names-per-location.md) | A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-enum-value-names](rules/unique-enum-value-names.md) | A GraphQL enum type is only valid if all its values are uniquely named. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-field-definition-names](rules/unique-field-definition-names.md) | A GraphQL complex type is only valid if all its fields are uniquely named. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-fragment-name](rules/unique-fragment-name.md) | This rule allow you to enforce unique fragment name across your application. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [unique-input-field-names](rules/unique-input-field-names.md) | A GraphQL input object value is only valid if all supplied fields are uniquely named. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-operation-name](rules/unique-operation-name.md) | This rule allow you to enforce unique operation names across your project. | &nbsp;&nbsp;&nbsp;🚀 |  |
| [unique-operation-types](rules/unique-operation-types.md) | A GraphQL document is only valid if it has only one type per operation. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-type-names](rules/unique-type-names.md) | A GraphQL document is only valid if all defined types have unique names. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [unique-variable-names](rules/unique-variable-names.md) | A GraphQL operation is only valid if all its variables are uniquely named. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [value-literals-of-correct-type](rules/value-literals-of-correct-type.md) | A GraphQL document is only valid if all value literals are of the type expected at their position. | &nbsp;&nbsp;&nbsp;🔮 |  |
| [variables-are-input-types](rules/variables-are-input-types.md) | A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object). | &nbsp;&nbsp;&nbsp;🔮 |  |
| [variables-in-allowed-position](rules/variables-in-allowed-position.md) | Variables passed to field arguments conform to type. | &nbsp;&nbsp;&nbsp;🔮 |  |
<!-- RULES_TABLE_END -->

## Further Reading

- [Writing Custom Rules](custom-rules.md)
- [How the parser works?](parser.md)
- [`parserOptions`](parser-options.md)