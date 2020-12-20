import { ValidationRule } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { validateDoc } from './validate-against-schema';
import { requireGraphQLSchemaFromContext } from '../utils';

import { ExecutableDefinitionsRule } from 'graphql/validation/rules/ExecutableDefinitionsRule';
import { FieldsOnCorrectTypeRule } from 'graphql/validation/rules/FieldsOnCorrectTypeRule';
import { FragmentsOnCompositeTypesRule } from 'graphql/validation/rules/FragmentsOnCompositeTypesRule';
import { KnownArgumentNamesRule } from 'graphql/validation/rules/KnownArgumentNamesRule';
import { KnownDirectivesRule } from 'graphql/validation/rules/KnownDirectivesRule';
import { KnownFragmentNamesRule } from 'graphql/validation/rules/KnownFragmentNamesRule';
import { KnownTypeNamesRule } from 'graphql/validation/rules/KnownTypeNamesRule';
import { LoneAnonymousOperationRule } from 'graphql/validation/rules/LoneAnonymousOperationRule';
import { LoneSchemaDefinition } from 'graphql/validation/rules/LoneSchemaDefinition';
import { NoFragmentCyclesRule } from 'graphql/validation/rules/NoFragmentCyclesRule';
import { NoUndefinedVariablesRule } from 'graphql/validation/rules/NoUndefinedVariablesRule';
import { NoUnusedFragmentsRule } from 'graphql/validation/rules/NoUnusedFragmentsRule';
import { NoUnusedVariablesRule } from 'graphql/validation/rules/NoUnusedVariablesRule';
import { OverlappingFieldsCanBeMergedRule } from 'graphql/validation/rules/OverlappingFieldsCanBeMergedRule';
import { PossibleFragmentSpreadsRule } from 'graphql/validation/rules/PossibleFragmentSpreadsRule';
import { PossibleTypeExtensionsRule } from 'graphql/validation/rules/PossibleTypeExtensionsRule';
import { ProvidedRequiredArgumentsRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';
import { ScalarLeafsRule } from 'graphql/validation/rules/ScalarLeafsRule';
import { SingleFieldSubscriptionsRule } from 'graphql/validation/rules/SingleFieldSubscriptionsRule';
import { UniqueArgumentNamesRule } from 'graphql/validation/rules/UniqueArgumentNamesRule';
import { UniqueDirectiveNamesRule } from 'graphql/validation/rules/UniqueDirectiveNamesRule';
import { UniqueDirectivesPerLocationRule } from 'graphql/validation/rules/UniqueDirectivesPerLocationRule';
import { UniqueEnumValueNamesRule } from 'graphql/validation/rules/UniqueEnumValueNamesRule';
import { UniqueFieldDefinitionNamesRule } from 'graphql/validation/rules/UniqueFieldDefinitionNamesRule';
import { UniqueInputFieldNamesRule } from 'graphql/validation/rules/UniqueInputFieldNamesRule';
import { UniqueOperationTypesRule } from 'graphql/validation/rules/UniqueOperationTypesRule';
import { UniqueTypeNamesRule } from 'graphql/validation/rules/UniqueTypeNamesRule';
import { UniqueVariableNamesRule } from 'graphql/validation/rules/UniqueVariableNamesRule';
import { ValuesOfCorrectTypeRule } from 'graphql/validation/rules/ValuesOfCorrectTypeRule';
import { VariablesAreInputTypesRule } from 'graphql/validation/rules/VariablesAreInputTypesRule';
import { VariablesInAllowedPositionRule } from 'graphql/validation/rules/VariablesInAllowedPositionRule';

const validationToRule = (
  name: string,
  rule: ValidationRule,
  meta: GraphQLESLintRule['meta']
): Record<typeof name, GraphQLESLintRule<any, true>> =>
  rule
    ? {
        [name]: {
          meta: {
            ...meta,
            docs: {
              category: 'Validation',
              requiresSchema: true,
              requiresSiblings: false,
              url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${name}.md`,
              ...meta.docs,
              description:
                meta.docs.description +
                `\n\n> This rule is a wrapper around a \`graphql-js\` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/master/src/validation/rules/${rule.name}.js).`,
            },
          },
          create: context => {
            return {
              Document(node) {
                const schema = requireGraphQLSchemaFromContext(name, context);
                validateDoc(node, context, schema, node.rawNode(), [rule], rule.name);
              },
            };
          },
        },
      }
    : {};

export const GRAPHQL_JS_VALIDATIONS: Record<string, GraphQLESLintRule> = {
  ...validationToRule('executable-definitions', ExecutableDefinitionsRule, {
    docs: {
      description: `A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.`,
    },
  }),
  ...validationToRule('fields-on-correct-type', FieldsOnCorrectTypeRule, {
    docs: {
      description: `A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as __typename.`,
    },
  }),
  ...validationToRule('fragments-on-composite-type', FragmentsOnCompositeTypesRule, {
    docs: {
      description: `Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.`,
    },
  }),
  ...validationToRule('known-argument-names', KnownArgumentNamesRule, {
    docs: {
      description: `A GraphQL field is only valid if all supplied arguments are defined by that field.`,
    },
  }),
  ...validationToRule('known-directives', KnownDirectivesRule, {
    docs: {
      description: `A GraphQL document is only valid if all \`@directives\` are known by the schema and legally positioned.`,
    },
  }),
  ...validationToRule('known-fragment-names', KnownFragmentNamesRule, {
    docs: {
      description: `A GraphQL document is only valid if all \`...Fragment\` fragment spreads refer to fragments defined in the same document.`,
    },
  }),
  ...validationToRule('known-type-names', KnownTypeNamesRule, {
    docs: {
      description: `A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.`,
    },
  }),
  ...validationToRule('lone-anonymous-operation', LoneAnonymousOperationRule, {
    docs: {
      description: `A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.`,
    },
  }),
  ...validationToRule('lone-schema-definition', LoneSchemaDefinition, {
    docs: {
      description: `A GraphQL document is only valid if it contains only one schema definition.`,
    },
  }),
  ...validationToRule('no-fragment-cycles', NoFragmentCyclesRule, {
    docs: {
      description: `A GraphQL fragment is only valid when it does not have cycles in fragments usage.`,
    },
  }),
  ...validationToRule('no-undefined-variables', NoUndefinedVariablesRule, {
    docs: {
      description: `A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.`,
    },
  }),
  ...validationToRule('no-unused-fragments', NoUnusedFragmentsRule, {
    docs: {
      description: `A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.`,
    },
  }),
  ...validationToRule('no-unused-variables', NoUnusedVariablesRule, {
    docs: {
      description: `A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.`,
    },
  }),
  ...validationToRule('overlapping-fields-can-be-merged', OverlappingFieldsCanBeMergedRule, {
    docs: {
      description: `A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.`,
    },
  }),
  ...validationToRule('possible-fragment-spread', PossibleFragmentSpreadsRule, {
    docs: {
      description: `A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.`,
    },
  }),
  ...validationToRule('possible-type-extension', PossibleTypeExtensionsRule, {
    docs: {
      description: `A type extension is only valid if the type is defined and has the same kind.`,
    },
  }),
  ...validationToRule('provided-required-arguments', ProvidedRequiredArgumentsRule, {
    docs: {
      description: `A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.`,
    },
  }),
  ...validationToRule('scalar-leafs', ScalarLeafsRule, {
    docs: {
      description: `A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.`,
    },
  }),
  ...validationToRule('one-field-subscriptions', SingleFieldSubscriptionsRule, {
    docs: {
      description: `A GraphQL subscription is valid only if it contains a single root field.`,
    },
  }),
  ...validationToRule('unique-argument-names', UniqueArgumentNamesRule, {
    docs: {
      description: `A GraphQL field or directive is only valid if all supplied arguments are uniquely named.`,
    },
  }),
  ...validationToRule('unique-directive-names', UniqueDirectiveNamesRule, {
    docs: {
      description: `A GraphQL document is only valid if all defined directives have unique names.`,
    },
  }),
  ...validationToRule('unique-directive-names-per-location', UniqueDirectivesPerLocationRule, {
    docs: {
      description: `A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.`,
    },
  }),
  ...validationToRule('unique-enum-value-names', UniqueEnumValueNamesRule, {
    docs: {
      description: `A GraphQL enum type is only valid if all its values are uniquely named.`,
    },
  }),
  ...validationToRule('unique-field-definition-names', UniqueFieldDefinitionNamesRule, {
    docs: {
      description: `A GraphQL complex type is only valid if all its fields are uniquely named.`,
    },
  }),
  ...validationToRule('unique-input-field-names', UniqueInputFieldNamesRule, {
    docs: {
      description: `A GraphQL input object value is only valid if all supplied fields are uniquely named.`,
    },
  }),
  ...validationToRule('unique-operation-types', UniqueOperationTypesRule, {
    docs: {
      description: `A GraphQL document is only valid if it has only one type per operation.`,
    },
  }),
  ...validationToRule('unique-type-names', UniqueTypeNamesRule, {
    docs: {
      description: `A GraphQL document is only valid if all defined types have unique names.`,
    },
  }),
  ...validationToRule('unique-variable-names', UniqueVariableNamesRule, {
    docs: {
      description: `A GraphQL operation is only valid if all its variables are uniquely named.`,
    },
  }),
  ...validationToRule('value-literals-of-correct-type', ValuesOfCorrectTypeRule, {
    docs: {
      description: `A GraphQL document is only valid if all value literals are of the type expected at their position.`,
    },
  }),
  ...validationToRule('variables-are-input-types', VariablesAreInputTypesRule, {
    docs: {
      description: `A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).`,
    },
  }),
  ...validationToRule('variables-in-allowed-position', VariablesInAllowedPositionRule, {
    docs: {
      description: `Variables passed to field arguments conform to type.`,
    },
  }),
};
