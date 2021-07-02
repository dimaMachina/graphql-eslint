import { validate, GraphQLSchema, DocumentNode, ASTNode, ValidationRule } from 'graphql';
import { validateSDL } from 'graphql/validation/validate';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import fs from 'fs';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types';
import { requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';

function extractRuleName(stack: string | undefined): string | null {
  const match = (stack || '').match(/validation[/\\\\]rules[/\\\\](.*?)\.js:/);

  if (!match) {
    return null;
  }

  return match[1] || null;
}

export function validateDoc(
  sourceNode: GraphQLESTreeNode<ASTNode>,
  context: GraphQLESLintRuleContext,
  schema: GraphQLSchema | null,
  documentNode: DocumentNode,
  rules: ReadonlyArray<ValidationRule>,
  ruleName: string | null = null
): void {
  if (documentNode && documentNode.definitions && documentNode.definitions.length > 0) {
    try {
      const validationErrors = schema ? validate(schema, documentNode, rules) : validateSDL(documentNode, null, rules);

      for (const error of validationErrors) {
        const validateRuleName = ruleName || `[${extractRuleName(error.stack)}]`;

        context.report({
          loc: error.locations[0],
          message: ruleName ? error.message : `${validateRuleName} ${error.message}`,
        });
      }
    } catch (e) {
      context.report({
        node: sourceNode,
        message: e.message,
      });
    }
  }
}

const isGraphQLImportFile = rawSDL => {
  const trimmedRawSDL = rawSDL.trim();
  return trimmedRawSDL.startsWith('# import') || trimmedRawSDL.startsWith('#import');
};

const validationToRule = (
  name: string,
  ruleName: string,
  docs: Partial<GraphQLESLintRule['meta']['docs']>,
  getDocumentNode?: (context: GraphQLESLintRuleContext) => DocumentNode | null
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

  const requiresSchema = docs.requiresSchema ?? true;

  return {
    [name]: {
      meta: {
        docs: {
          ...docs,
          category: 'Validation',
          requiresSchema,
          requiresSiblings: false,
          url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${name}.md`,
          description: `${docs.description}\n\n> This rule is a wrapper around a \`graphql-js\` validation function. [You can find it's source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/${ruleName}Rule.ts).`,
        },
      },
      create(context) {
        return {
          Document(node) {
            if (!ruleFn) {
              // eslint-disable-next-line no-console
              console.warn(
                `You rule "${name}" depends on a GraphQL validation rule ("${ruleName}") but it's not available in the "graphql-js" version you are using. Skipping...`
              );
              return;
            }

            const schema = requiresSchema ? requireGraphQLSchemaFromContext(name, context) : null;

            let documentNode: DocumentNode;
            const filePath = context.getFilename();
            const isVirtualFile = !fs.existsSync(filePath);
            if (!isVirtualFile && getDocumentNode) {
              documentNode = getDocumentNode(context);
            }
            validateDoc(node, context, schema, documentNode || node.rawNode(), [ruleFn], ruleName);
          },
        };
      },
    },
  };
};

export const GRAPHQL_JS_VALIDATIONS = Object.assign(
  {},
  validationToRule('executable-definitions', 'ExecutableDefinitions', {
    description: `A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.`,
  }),
  validationToRule('fields-on-correct-type', 'FieldsOnCorrectType', {
    description:
      'A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.',
  }),
  validationToRule('fragments-on-composite-type', 'FragmentsOnCompositeTypes', {
    description: `Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.`,
  }),
  validationToRule('known-argument-names', 'KnownArgumentNames', {
    description: `A GraphQL field is only valid if all supplied arguments are defined by that field.`,
  }),
  validationToRule('known-directives', 'KnownDirectives', {
    description: `A GraphQL document is only valid if all \`@directives\` are known by the schema and legally positioned.`,
  }),
  validationToRule(
    'known-fragment-names',
    'KnownFragmentNames',
    {
      description: `A GraphQL document is only valid if all \`...Fragment\` fragment spreads refer to fragments defined in the same document.`,
      examples: [
        {
          title: 'Incorrect (fragment not defined in the document)',
          code: /* GraphQL */ `
            query {
              user {
                id
                ...UserFields
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            fragment UserFields on User {
              firstName
              lastName
            }

            query {
              user {
                id
                ...UserFields
              }
            }
          `,
        },
        {
          title: 'Correct (existing import to UserFields fragment)',
          code: /* GraphQL */ `
            #import '../UserFields.gql'

            query {
              user {
                id
                ...UserFields
              }
            }
          `,
        },
      ],
    },
    context => {
      const code = context.getSourceCode().text;
      if (!isGraphQLImportFile(code)) {
        return null;
      }
      // Import documents if file contains '#import' comments
      const fileLoader = new GraphQLFileLoader();
      const graphqlAst = fileLoader.handleFileContent(code, context.getFilename(), { noLocation: true });
      return graphqlAst.document;
    }
  ),
  validationToRule('known-type-names', 'KnownTypeNames', {
    description: `A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.`,
  }),
  validationToRule('lone-anonymous-operation', 'LoneAnonymousOperation', {
    description: `A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.`,
  }),
  validationToRule('lone-schema-definition', 'LoneSchemaDefinition', {
    description: `A GraphQL document is only valid if it contains only one schema definition.`,
    requiresSchema: false,
  }),
  validationToRule('no-fragment-cycles', 'NoFragmentCycles', {
    description: `A GraphQL fragment is only valid when it does not have cycles in fragments usage.`,
  }),
  validationToRule('no-undefined-variables', 'NoUndefinedVariables', {
    description: `A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.`,
  }),
  validationToRule('no-unused-fragments', 'NoUnusedFragments', {
    description: `A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.`,
  }),
  validationToRule('no-unused-variables', 'NoUnusedVariables', {
    description: `A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.`,
  }),
  validationToRule('overlapping-fields-can-be-merged', 'OverlappingFieldsCanBeMerged', {
    description: `A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.`,
  }),
  validationToRule('possible-fragment-spread', 'PossibleFragmentSpreads', {
    description: `A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.`,
  }),
  validationToRule('possible-type-extension', 'PossibleTypeExtensions', {
    description: `A type extension is only valid if the type is defined and has the same kind.`,
    requiresSchema: false,
  }),
  validationToRule('provided-required-arguments', 'ProvidedRequiredArguments', {
    description: `A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.`,
  }),
  validationToRule('scalar-leafs', 'ScalarLeafs', {
    description: `A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.`,
  }),
  validationToRule('one-field-subscriptions', 'SingleFieldSubscriptions', {
    description: `A GraphQL subscription is valid only if it contains a single root field.`,
  }),
  validationToRule('unique-argument-names', 'UniqueArgumentNames', {
    description: `A GraphQL field or directive is only valid if all supplied arguments are uniquely named.`,
  }),
  validationToRule('unique-directive-names', 'UniqueDirectiveNames', {
    description: `A GraphQL document is only valid if all defined directives have unique names.`,
    requiresSchema: false,
  }),
  validationToRule('unique-directive-names-per-location', 'UniqueDirectivesPerLocation', {
    description: `A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.`,
  }),
  validationToRule('unique-enum-value-names', 'UniqueEnumValueNames', {
    description: `A GraphQL enum type is only valid if all its values are uniquely named.`,
    requiresSchema: false,
  }),
  validationToRule('unique-field-definition-names', 'UniqueFieldDefinitionNames', {
    description: `A GraphQL complex type is only valid if all its fields are uniquely named.`,
    requiresSchema: false,
  }),
  validationToRule('unique-input-field-names', 'UniqueInputFieldNames', {
    description: `A GraphQL input object value is only valid if all supplied fields are uniquely named.`,
    requiresSchema: false,
  }),
  validationToRule('unique-operation-types', 'UniqueOperationTypes', {
    description: `A GraphQL document is only valid if it has only one type per operation.`,
    requiresSchema: false,
  }),
  validationToRule('unique-type-names', 'UniqueTypeNames', {
    description: `A GraphQL document is only valid if all defined types have unique names.`,
    requiresSchema: false,
  }),
  validationToRule('unique-variable-names', 'UniqueVariableNames', {
    description: `A GraphQL operation is only valid if all its variables are uniquely named.`,
  }),
  validationToRule('value-literals-of-correct-type', 'ValuesOfCorrectType', {
    description: `A GraphQL document is only valid if all value literals are of the type expected at their position.`,
  }),
  validationToRule('variables-are-input-types', 'VariablesAreInputTypes', {
    description: `A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).`,
  }),
  validationToRule('variables-in-allowed-position', 'VariablesInAllowedPosition', {
    description: `Variables passed to field arguments conform to type.`,
  })
) as Record<string, GraphQLESLintRule>;
