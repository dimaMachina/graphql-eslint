import { ValidationRule } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { validateDoc } from './validate-against-schema';
import { requireGraphQLSchemaFromContext } from '../utils';

const validationToRule = (
  name: string,
  ruleName: string,
  meta: GraphQLESLintRule['meta']
): Record<typeof name, GraphQLESLintRule<any, true>> => {
  let ruleFn: null | ValidationRule = null;

  try {
    ruleFn = require(`graphql/validation/rules/${ruleName}Rule`)[`${ruleName}Rule`];
  } catch (e) {
    try {
      ruleFn = require(`graphql/validation/rules/${ruleName}`)[`${ruleName}Rule`];
    } catch (e) {
      ruleFn = require('graphql/validation')[`${ruleName}Rule`];
    }
  }

  return {
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
            `\n\n> This rule is a wrapper around a \`graphql-js\` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/master/src/validation/rules/${ruleName}.js).`,
        },
      },
      create: context => {
        return {
          Document(node) {
            if (!ruleFn) {
              // eslint-disable-next-line no-console
              console.warn(
                `You rule "${name}" depends on a GraphQL validation rule ("${ruleName}") but it's not available in the "graphql-js" version you are using. Skipping...`
              );

              return;
            }

            const schema = requireGraphQLSchemaFromContext(name, context);
            validateDoc(node, context, schema, node.rawNode(), [ruleFn], ruleName);
          },
        };
      },
    },
  };
};

export const GRAPHQL_JS_VALIDATIONS: Record<string, GraphQLESLintRule> = {
  ...validationToRule('executable-definitions', 'ExecutableDefinitions', {
    docs: {
      description: `A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.`,
    },
  }),
  ...validationToRule('fields-on-correct-type', 'FieldsOnCorrectType', {
    docs: {
      description: `A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as __typename.`,
    },
  }),
  ...validationToRule('fragments-on-composite-type', 'FragmentsOnCompositeTypes', {
    docs: {
      description: `Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.`,
    },
  }),
  ...validationToRule('known-argument-names', 'KnownArgumentNames', {
    docs: {
      description: `A GraphQL field is only valid if all supplied arguments are defined by that field.`,
    },
  }),
  ...validationToRule('known-directives', 'KnownDirectives', {
    docs: {
      description: `A GraphQL document is only valid if all \`@directives\` are known by the schema and legally positioned.`,
    },
  }),
  ...validationToRule('known-fragment-names', 'KnownFragmentNames', {
    docs: {
      description: `A GraphQL document is only valid if all \`...Fragment\` fragment spreads refer to fragments defined in the same document.`,
    },
  }),
  ...validationToRule('known-type-names', 'KnownTypeNames', {
    docs: {
      description: `A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.`,
    },
  }),
  ...validationToRule('lone-anonymous-operation', 'LoneAnonymousOperation', {
    docs: {
      description: `A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.`,
    },
  }),
  ...validationToRule('lone-schema-definition', 'LoneSchemaDefinition', {
    docs: {
      description: `A GraphQL document is only valid if it contains only one schema definition.`,
    },
  }),
  ...validationToRule('no-fragment-cycles', 'NoFragmentCycles', {
    docs: {
      description: `A GraphQL fragment is only valid when it does not have cycles in fragments usage.`,
    },
  }),
  ...validationToRule('no-undefined-variables', 'NoUndefinedVariables', {
    docs: {
      description: `A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.`,
    },
  }),
  ...validationToRule('no-unused-fragments', 'NoUnusedFragments', {
    docs: {
      description: `A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.`,
    },
  }),
  ...validationToRule('no-unused-variables', 'NoUnusedVariables', {
    docs: {
      description: `A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.`,
    },
  }),
  ...validationToRule('overlapping-fields-can-be-merged', 'OverlappingFieldsCanBeMerged', {
    docs: {
      description: `A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.`,
    },
  }),
  ...validationToRule('possible-fragment-spread', 'PossibleFragmentSpreads', {
    docs: {
      description: `A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.`,
    },
  }),
  ...validationToRule('possible-type-extension', 'PossibleTypeExtensions', {
    docs: {
      description: `A type extension is only valid if the type is defined and has the same kind.`,
    },
  }),
  ...validationToRule('provided-required-arguments', 'ProvidedRequiredArguments', {
    docs: {
      description: `A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.`,
    },
  }),
  ...validationToRule('scalar-leafs', 'ScalarLeafs', {
    docs: {
      description: `A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.`,
    },
  }),
  ...validationToRule('one-field-subscriptions', 'SingleFieldSubscriptions', {
    docs: {
      description: `A GraphQL subscription is valid only if it contains a single root field.`,
    },
  }),
  ...validationToRule('unique-argument-names', 'UniqueArgumentNames', {
    docs: {
      description: `A GraphQL field or directive is only valid if all supplied arguments are uniquely named.`,
    },
  }),
  ...validationToRule('unique-directive-names', 'UniqueDirectiveNames', {
    docs: {
      description: `A GraphQL document is only valid if all defined directives have unique names.`,
    },
  }),
  ...validationToRule('unique-directive-names-per-location', 'UniqueDirectivesPerLocation', {
    docs: {
      description: `A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.`,
    },
  }),
  ...validationToRule('unique-enum-value-names', 'UniqueEnumValueNames', {
    docs: {
      description: `A GraphQL enum type is only valid if all its values are uniquely named.`,
    },
  }),
  ...validationToRule('unique-field-definition-names', 'UniqueFieldDefinitionNames', {
    docs: {
      description: `A GraphQL complex type is only valid if all its fields are uniquely named.`,
    },
  }),
  ...validationToRule('unique-input-field-names', 'UniqueInputFieldNames', {
    docs: {
      description: `A GraphQL input object value is only valid if all supplied fields are uniquely named.`,
    },
  }),
  ...validationToRule('unique-operation-types', 'UniqueOperationTypes', {
    docs: {
      description: `A GraphQL document is only valid if it has only one type per operation.`,
    },
  }),
  ...validationToRule('unique-type-names', 'UniqueTypeNames', {
    docs: {
      description: `A GraphQL document is only valid if all defined types have unique names.`,
    },
  }),
  ...validationToRule('unique-variable-names', 'UniqueVariableNames', {
    docs: {
      description: `A GraphQL operation is only valid if all its variables are uniquely named.`,
    },
  }),
  ...validationToRule('value-literals-of-correct-type', 'ValuesOfCorrectType', {
    docs: {
      description: `A GraphQL document is only valid if all value literals are of the type expected at their position.`,
    },
  }),
  ...validationToRule('variables-are-input-types', 'VariablesAreInputTypes', {
    docs: {
      description: `A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).`,
    },
  }),
  ...validationToRule('variables-in-allowed-position', 'VariablesInAllowedPosition', {
    docs: {
      description: `Variables passed to field arguments conform to type.`,
    },
  }),
};
