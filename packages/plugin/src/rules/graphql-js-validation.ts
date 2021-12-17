import { AST } from 'eslint';
import {
  Kind,
  ASTNode,
  TypeInfo,
  DocumentNode,
  GraphQLSchema,
  ValidationRule,
  FragmentDefinitionNode,
  OperationDefinitionNode,
  visit,
  validate,
  visitWithTypeInfo,
} from 'graphql';
import { validateSDL } from 'graphql/validation/validate';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types';
import {
  getLocation,
  getGraphQLSchemaToExtend,
  requireGraphQLSchemaFromContext,
  requireSiblingsOperations,
} from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';

function validateDocument(
  sourceNode: GraphQLESTreeNode<ASTNode>,
  context: GraphQLESLintRuleContext,
  schema: GraphQLSchema | null = null,
  documentNode: DocumentNode,
  rule: ValidationRule,
  isSchemaToExtend = false
): void {
  if (documentNode.definitions.length === 0) {
    return;
  }
  try {
    const validationErrors =
      schema && !isSchemaToExtend
        ? validate(schema, documentNode, [rule])
        : validateSDL(documentNode, schema, [rule as any]);

    for (const error of validationErrors) {
      /*
       * TODO: Fix ESTree-AST converter because currently it's incorrectly convert loc.end
       * Example: loc.end always equal loc.start
       *  {
       *    token: {
       *      type: 'Name',
       *      loc: { start: { line: 4, column: 13 }, end: { line: 4, column: 13 } },
       *      value: 'veryBad',
       *      range: [ 40, 47 ]
       *    }
       *  }
       */
      const { line, column } = error.locations[0];
      const ancestors = context.getAncestors();
      const token = (ancestors[0] as AST.Program).tokens.find(
        token => token.loc.start.line === line && token.loc.start.column === column
      );

      context.report({
        loc: getLocation({ start: error.locations[0] }, token?.value),
        message: error.message,
      });
    }
  } catch (e) {
    context.report({
      node: sourceNode,
      message: e.message,
    });
  }
}

type FragmentInfo = `${string}:${string}`;

const getFragmentDefsAndFragmentSpreads = (
  schema: GraphQLSchema,
  node: DocumentNode
): {
  fragmentDefs: Set<FragmentInfo>;
  fragmentSpreads: Set<FragmentInfo>;
} => {
  const typeInfo = new TypeInfo(schema);
  const fragmentDefs = new Set<FragmentInfo>();
  const fragmentSpreads = new Set<FragmentInfo>();

  const visitor = visitWithTypeInfo(typeInfo, {
    FragmentDefinition(node) {
      fragmentDefs.add(`${node.name.value}:${node.typeCondition.name.value}`);
    },
    FragmentSpread(node) {
      const parentType = typeInfo.getParentType();
      if (parentType) {
        fragmentSpreads.add(`${node.name.value}:${parentType.name}`);
      }
    },
  });

  visit(node, visitor);
  return { fragmentDefs, fragmentSpreads };
};

const getMissingFragments = (schema: GraphQLSchema, node: DocumentNode): FragmentInfo[] => {
  const { fragmentDefs, fragmentSpreads } = getFragmentDefsAndFragmentSpreads(schema, node);
  return [...fragmentSpreads].filter(name => !fragmentDefs.has(name));
};

type GetDocumentNode = (props: {
  ruleId: string;
  context: GraphQLESLintRuleContext;
  schema: GraphQLSchema;
  node: DocumentNode;
}) => DocumentNode;

const handleMissingFragments: GetDocumentNode = ({ ruleId, context, schema, node }) => {
  const missingFragments = getMissingFragments(schema, node);
  if (missingFragments.length > 0) {
    const siblings = requireSiblingsOperations(ruleId, context);
    const fragmentsToAdd: FragmentDefinitionNode[] = [];

    for (const missingFragment of missingFragments) {
      const [fragmentName, fragmentTypeName] = missingFragment.split(':');
      const [foundFragment] = siblings
        .getFragment(fragmentName)
        .map(source => source.document)
        .filter(fragment => fragment.typeCondition.name.value === fragmentTypeName);
      if (foundFragment) {
        fragmentsToAdd.push(foundFragment);
      }
    }

    if (fragmentsToAdd.length > 0) {
      // recall fn to make sure to add fragments inside fragments
      return handleMissingFragments({
        ruleId,
        context,
        schema,
        node: {
          kind: Kind.DOCUMENT,
          definitions: [...node.definitions, ...fragmentsToAdd],
        },
      });
    }
  }
  return node;
};

const validationToRule = (
  ruleId: string,
  ruleName: string,
  docs: GraphQLESLintRule['meta']['docs'],
  getDocumentNode?: GetDocumentNode
): Record<typeof ruleId, GraphQLESLintRule<any, true>> => {
  let ruleFn: null | ValidationRule = null;

  try {
    ruleFn = require(`graphql/validation/rules/${ruleName}Rule`)[`${ruleName}Rule`];
  } catch {
    try {
      ruleFn = require(`graphql/validation/rules/${ruleName}`)[`${ruleName}Rule`];
    } catch {
      ruleFn = require('graphql/validation')[`${ruleName}Rule`];
    }
  }
  return {
    [ruleId]: {
      meta: {
        docs: {
          recommended: true,
          ...docs,
          graphQLJSRuleName: ruleName,
          url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${ruleId}.md`,
          description: `${docs.description}\n\n> This rule is a wrapper around a \`graphql-js\` validation function. [You can find its source code here](https://github.com/graphql/graphql-js/blob/main/src/validation/rules/${ruleName}Rule.ts).`,
        },
      },
      create(context) {
        if (!ruleFn) {
          // eslint-disable-next-line no-console
          console.warn(
            `You rule "${ruleId}" depends on a GraphQL validation rule "${ruleName}" but it's not available in the "graphql-js" version you are using. Skipping...`
          );
          return {};
        }

        let schema: GraphQLSchema;
        if (docs.requiresSchemaToExtend) {
          schema = getGraphQLSchemaToExtend(context);
        }
        if (docs.requiresSchema) {
          schema = requireGraphQLSchemaFromContext(ruleId, context);
        }

        return {
          Document(node) {
            const documentNode = getDocumentNode
              ? getDocumentNode({ ruleId, context, schema, node: node.rawNode() })
              : node.rawNode();
            validateDocument(node, context, schema, documentNode, ruleFn, docs.requiresSchemaToExtend);
          },
        };
      },
    },
  };
};

export const GRAPHQL_JS_VALIDATIONS: Record<string, GraphQLESLintRule> = Object.assign(
  {},
  validationToRule('executable-definitions', 'ExecutableDefinitions', {
    category: 'Operations',
    description: `A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.`,
    requiresSchema: true,
  }),
  validationToRule('fields-on-correct-type', 'FieldsOnCorrectType', {
    category: 'Operations',
    description:
      'A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.',
    requiresSchema: true,
  }),
  validationToRule('fragments-on-composite-type', 'FragmentsOnCompositeTypes', {
    category: 'Operations',
    description: `Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.`,
    requiresSchema: true,
  }),
  validationToRule('known-argument-names', 'KnownArgumentNames', {
    category: ['Schema', 'Operations'],
    description: `A GraphQL field is only valid if all supplied arguments are defined by that field.`,
    requiresSchema: true,
  }),
  validationToRule('known-directives', 'KnownDirectives', {
    category: ['Schema', 'Operations'],
    description: `A GraphQL document is only valid if all \`@directives\` are known by the schema and legally positioned.`,
    requiresSchema: true,
  }),
  validationToRule(
    'known-fragment-names',
    'KnownFragmentNames',
    {
      category: 'Operations',
      description: `A GraphQL document is only valid if all \`...Fragment\` fragment spreads refer to fragments defined in the same document.`,
      requiresSchema: true,
      requiresSiblings: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
              user {
                id
                ...UserFields # fragment not defined in the document
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
          title: 'Correct (`UserFields` fragment located in a separate file)',
          code: /* GraphQL */ `
            # user.gql
            query {
              user {
                id
                ...UserFields
              }
            }

            # user-fields.gql
            fragment UserFields on User {
              id
            }
          `,
        },
      ],
    },
    handleMissingFragments
  ),
  validationToRule('known-type-names', 'KnownTypeNames', {
    category: ['Schema', 'Operations'],
    description: `A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.`,
    requiresSchema: true,
  }),
  validationToRule('lone-anonymous-operation', 'LoneAnonymousOperation', {
    category: 'Operations',
    description: `A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.`,
    requiresSchema: true,
  }),
  validationToRule('lone-schema-definition', 'LoneSchemaDefinition', {
    category: 'Schema',
    description: `A GraphQL document is only valid if it contains only one schema definition.`,
  }),
  validationToRule('no-fragment-cycles', 'NoFragmentCycles', {
    category: 'Operations',
    description: `A GraphQL fragment is only valid when it does not have cycles in fragments usage.`,
    requiresSchema: true,
  }),
  validationToRule(
    'no-undefined-variables',
    'NoUndefinedVariables',
    {
      category: 'Operations',
      description: `A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.`,
      requiresSchema: true,
      requiresSiblings: true,
    },
    handleMissingFragments
  ),
  validationToRule(
    'no-unused-fragments',
    'NoUnusedFragments',
    {
      category: 'Operations',
      description: `A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.`,
      requiresSchema: true,
      requiresSiblings: true,
    },
    ({ ruleId, context, schema, node }) => {
      const siblings = requireSiblingsOperations(ruleId, context);
      const FilePathToDocumentsMap = [...siblings.getOperations(), ...siblings.getFragments()].reduce<
        Record<string, (OperationDefinitionNode | FragmentDefinitionNode)[]>
      >((map, { filePath, document }) => {
        map[filePath] ??= [];
        map[filePath].push(document);
        return map;
      }, Object.create(null));

      const getParentNode = (currentFilePath: string, node: DocumentNode): DocumentNode => {
        const { fragmentDefs } = getFragmentDefsAndFragmentSpreads(schema, node);
        if (fragmentDefs.size === 0) {
          return node;
        }
        // skip iteration over documents for current filepath
        delete FilePathToDocumentsMap[currentFilePath];

        for (const [filePath, documents] of Object.entries(FilePathToDocumentsMap)) {
          const missingFragments = getMissingFragments(schema, {
            kind: Kind.DOCUMENT,
            definitions: documents,
          });
          const isCurrentFileImportFragment = missingFragments.some(fragment => fragmentDefs.has(fragment));

          if (isCurrentFileImportFragment) {
            return getParentNode(filePath, {
              kind: Kind.DOCUMENT,
              definitions: [...node.definitions, ...documents],
            });
          }
        }
        return node;
      };

      return getParentNode(context.getFilename(), node);
    }
  ),
  validationToRule(
    'no-unused-variables',
    'NoUnusedVariables',
    {
      category: 'Operations',
      description: `A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.`,
      requiresSchema: true,
      requiresSiblings: true,
    },
    handleMissingFragments
  ),
  validationToRule('overlapping-fields-can-be-merged', 'OverlappingFieldsCanBeMerged', {
    category: 'Operations',
    description: `A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.`,
    requiresSchema: true,
  }),
  validationToRule('possible-fragment-spread', 'PossibleFragmentSpreads', {
    category: 'Operations',
    description: `A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.`,
    requiresSchema: true,
  }),
  validationToRule('possible-type-extension', 'PossibleTypeExtensions', {
    category: 'Schema',
    description: `A type extension is only valid if the type is defined and has the same kind.`,
    recommended: false, // TODO: enable after https://github.com/dotansimha/graphql-eslint/issues/787 will be fixed
    requiresSchemaToExtend: true,
  }),
  validationToRule('provided-required-arguments', 'ProvidedRequiredArguments', {
    category: ['Schema', 'Operations'],
    description: `A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.`,
    requiresSchema: true,
  }),
  validationToRule('scalar-leafs', 'ScalarLeafs', {
    category: 'Operations',
    description: `A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.`,
    requiresSchema: true,
  }),
  validationToRule('one-field-subscriptions', 'SingleFieldSubscriptions', {
    category: 'Operations',
    description: `A GraphQL subscription is valid only if it contains a single root field.`,
    requiresSchema: true,
  }),
  validationToRule('unique-argument-names', 'UniqueArgumentNames', {
    category: 'Operations',
    description: `A GraphQL field or directive is only valid if all supplied arguments are uniquely named.`,
    requiresSchema: true,
  }),
  validationToRule('unique-directive-names', 'UniqueDirectiveNames', {
    category: 'Schema',
    description: `A GraphQL document is only valid if all defined directives have unique names.`,
  }),
  validationToRule('unique-directive-names-per-location', 'UniqueDirectivesPerLocation', {
    category: ['Schema', 'Operations'],
    description: `A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.`,
    requiresSchema: true,
  }),
  validationToRule('unique-enum-value-names', 'UniqueEnumValueNames', {
    category: 'Schema',
    description: `A GraphQL enum type is only valid if all its values are uniquely named.`,
    recommended: false,
  }),
  validationToRule('unique-field-definition-names', 'UniqueFieldDefinitionNames', {
    category: 'Schema',
    description: `A GraphQL complex type is only valid if all its fields are uniquely named.`,
  }),
  validationToRule('unique-input-field-names', 'UniqueInputFieldNames', {
    category: 'Operations',
    description: `A GraphQL input object value is only valid if all supplied fields are uniquely named.`,
  }),
  validationToRule('unique-operation-types', 'UniqueOperationTypes', {
    category: 'Schema',
    description: `A GraphQL document is only valid if it has only one type per operation.`,
  }),
  validationToRule('unique-type-names', 'UniqueTypeNames', {
    category: 'Schema',
    description: `A GraphQL document is only valid if all defined types have unique names.`,
  }),
  validationToRule('unique-variable-names', 'UniqueVariableNames', {
    category: 'Operations',
    description: `A GraphQL operation is only valid if all its variables are uniquely named.`,
    requiresSchema: true,
  }),
  validationToRule('value-literals-of-correct-type', 'ValuesOfCorrectType', {
    category: 'Operations',
    description: `A GraphQL document is only valid if all value literals are of the type expected at their position.`,
    requiresSchema: true,
  }),
  validationToRule('variables-are-input-types', 'VariablesAreInputTypes', {
    category: 'Operations',
    description: `A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).`,
    requiresSchema: true,
  }),
  validationToRule('variables-in-allowed-position', 'VariablesInAllowedPosition', {
    category: 'Operations',
    description: `Variables passed to field arguments conform to type.`,
    requiresSchema: true,
  })
);
