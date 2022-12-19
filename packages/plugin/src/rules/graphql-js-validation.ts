import { AST } from 'eslint';
import { JSONSchema4 } from 'json-schema';
import {
  Kind,
  DocumentNode,
  GraphQLSchema,
  ValidationRule,
  FragmentDefinitionNode,
  visit,
  validate,
  ASTVisitor,
  ExecutableDefinitionNode,
  DirectiveNode,
} from 'graphql';
import { validateSDL } from 'graphql/validation/validate';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types';
import {
  requireGraphQLSchemaFromContext,
  requireSiblingsOperations,
  logger,
  REPORT_ON_FIRST_CHARACTER,
  ARRAY_DEFAULT_OPTIONS,
} from '../utils';

function validateDocument(
  context: GraphQLESLintRuleContext,
  schema: GraphQLSchema | null = null,
  documentNode: DocumentNode,
  rule: ValidationRule,
): void {
  if (documentNode.definitions.length === 0) {
    return;
  }
  try {
    const validationErrors = schema
      ? validate(schema, documentNode, [rule])
      : validateSDL(documentNode, null, [rule as any]);

    for (const error of validationErrors) {
      const { line, column } = error.locations[0];
      const sourceCode = context.getSourceCode();
      const { tokens } = sourceCode.ast;
      const token = tokens.find(
        token => token.loc.start.line === line && token.loc.start.column === column - 1,
      );

      let loc: { line: number; column: number } | AST.SourceLocation = {
        line,
        column: column - 1,
      };
      if (token) {
        loc =
          // if cursor on `@` symbol than use next node
          (token.type as any) === '@'
            ? sourceCode.getNodeByRangeIndex(token.range[1] + 1).loc
            : token.loc;
      }

      context.report({
        loc,
        message: error.message,
      });
    }
  } catch (e) {
    context.report({
      loc: REPORT_ON_FIRST_CHARACTER,
      message: e.message,
    });
  }
}

type GetFragmentDefsAndFragmentSpreads = {
  fragmentDefs: Set<string>;
  fragmentSpreads: Set<string>;
};

const getFragmentDefsAndFragmentSpreads = (
  node: DocumentNode,
): GetFragmentDefsAndFragmentSpreads => {
  const fragmentDefs = new Set<string>();
  const fragmentSpreads = new Set<string>();

  const visitor: ASTVisitor = {
    FragmentDefinition(node) {
      fragmentDefs.add(node.name.value);
    },
    FragmentSpread(node) {
      fragmentSpreads.add(node.name.value);
    },
  };

  visit(node, visitor);
  return { fragmentDefs, fragmentSpreads };
};

const getMissingFragments = (node: DocumentNode): string[] => {
  const { fragmentDefs, fragmentSpreads } = getFragmentDefsAndFragmentSpreads(node);
  return [...fragmentSpreads].filter(name => !fragmentDefs.has(name));
};

type GetDocumentNode = (props: {
  ruleId: string;
  context: GraphQLESLintRuleContext;
  node: DocumentNode;
}) => DocumentNode;

const handleMissingFragments: GetDocumentNode = ({ ruleId, context, node }) => {
  const missingFragments = getMissingFragments(node);
  if (missingFragments.length > 0) {
    const siblings = requireSiblingsOperations(ruleId, context);
    const fragmentsToAdd: FragmentDefinitionNode[] = [];

    for (const fragmentName of missingFragments) {
      const [foundFragment] = siblings.getFragment(fragmentName).map(source => source.document);
      if (foundFragment) {
        fragmentsToAdd.push(foundFragment);
      }
    }

    if (fragmentsToAdd.length > 0) {
      // recall fn to make sure to add fragments inside fragments
      return handleMissingFragments({
        ruleId,
        context,
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
  {
    ruleId,
    ruleName,
    getDocumentNode,
    schema = [],
  }: {
    ruleId: string;
    ruleName: string;
    getDocumentNode?: GetDocumentNode;
    schema?: JSONSchema4 | JSONSchema4[];
  },
  docs: Omit<GraphQLESLintRule['meta']['docs'], 'url'>,
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
          url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${ruleId}.md`,
          description: `${docs.description}\n\n> This rule is a wrapper around a \`graphql-js\` validation function.`,
        },
        schema,
      },
      create(context) {
        if (!ruleFn) {
          logger.warn(
            `Rule "${ruleId}" depends on a GraphQL validation rule "${ruleName}" but it's not available in the "graphql" version you are using. Skipping…`,
          );
          return {};
        }

        return {
          Document(node) {
            const schema = docs.requiresSchema
              ? requireGraphQLSchemaFromContext(ruleId, context)
              : null;

            const documentNode = getDocumentNode
              ? getDocumentNode({ ruleId, context, node: node.rawNode() })
              : node.rawNode();

            validateDocument(context, schema, documentNode, ruleFn);
          },
        };
      },
    },
  };
};

export const GRAPHQL_JS_VALIDATIONS: Record<string, GraphQLESLintRule> = Object.assign(
  {},
  validationToRule(
    {
      ruleId: 'executable-definitions',
      ruleName: 'ExecutableDefinitions',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'fields-on-correct-type',
      ruleName: 'FieldsOnCorrectType',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'fragments-on-composite-type',
      ruleName: 'FragmentsOnCompositeTypes',
    },
    {
      category: 'Operations',
      description:
        'Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'known-argument-names',
      ruleName: 'KnownArgumentNames',
    },
    {
      category: ['Schema', 'Operations'],
      description:
        'A GraphQL field is only valid if all supplied arguments are defined by that field.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'known-directives',
      ruleName: 'KnownDirectives',
      getDocumentNode({ context, node: documentNode }) {
        const { ignoreClientDirectives = [] } = context.options[0] || {};
        if (ignoreClientDirectives.length === 0) {
          return documentNode;
        }

        const filterDirectives = (node: { directives?: ReadonlyArray<DirectiveNode> }) => ({
          ...node,
          directives: node.directives.filter(
            directive => !ignoreClientDirectives.includes(directive.name.value),
          ),
        });

        return visit(documentNode, {
          Field: filterDirectives,
          OperationDefinition: filterDirectives,
        });
      },
      schema: {
        type: 'array',
        maxItems: 1,
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['ignoreClientDirectives'],
          properties: {
            ignoreClientDirectives: ARRAY_DEFAULT_OPTIONS,
          },
        },
      },
    },
    {
      category: ['Schema', 'Operations'],
      description:
        'A GraphQL document is only valid if all `@directive`s are known by the schema and legally positioned.',
      requiresSchema: true,
      examples: [
        {
          title: 'Valid',
          usage: [{ ignoreClientDirectives: ['client'] }],
          code: /* GraphQL */ `
            {
              product {
                someClientField @client
              }
            }
          `,
        },
      ],
    },
  ),
  validationToRule(
    {
      ruleId: 'known-fragment-names',
      ruleName: 'KnownFragmentNames',
      getDocumentNode: handleMissingFragments,
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document.',
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
  ),
  validationToRule(
    {
      ruleId: 'known-type-names',
      ruleName: 'KnownTypeNames',
    },
    {
      category: ['Schema', 'Operations'],
      description:
        'A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'lone-anonymous-operation',
      ruleName: 'LoneAnonymousOperation',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'lone-schema-definition',
      ruleName: 'LoneSchemaDefinition',
    },
    {
      category: 'Schema',
      description: 'A GraphQL document is only valid if it contains only one schema definition.',
    },
  ),
  validationToRule(
    {
      ruleId: 'no-fragment-cycles',
      ruleName: 'NoFragmentCycles',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL fragment is only valid when it does not have cycles in fragments usage.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'no-undefined-variables',
      ruleName: 'NoUndefinedVariables',
      getDocumentNode: handleMissingFragments,
    },
    {
      category: 'Operations',
      description:
        'A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.',
      requiresSchema: true,
      requiresSiblings: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'no-unused-fragments',
      ruleName: 'NoUnusedFragments',
      getDocumentNode: ({ ruleId, context, node }) => {
        const siblings = requireSiblingsOperations(ruleId, context);
        const FilePathToDocumentsMap = [
          ...siblings.getOperations(),
          ...siblings.getFragments(),
        ].reduce<Record<string, ExecutableDefinitionNode[]>>((map, { filePath, document }) => {
          map[filePath] ??= [];
          map[filePath].push(document);
          return map;
        }, Object.create(null));

        const getParentNode = (currentFilePath: string, node: DocumentNode): DocumentNode => {
          const { fragmentDefs } = getFragmentDefsAndFragmentSpreads(node);
          if (fragmentDefs.size === 0) {
            return node;
          }
          // skip iteration over documents for current filepath
          delete FilePathToDocumentsMap[currentFilePath];

          for (const [filePath, documents] of Object.entries(FilePathToDocumentsMap)) {
            const missingFragments = getMissingFragments({
              kind: Kind.DOCUMENT,
              definitions: documents,
            });
            const isCurrentFileImportFragment = missingFragments.some(fragment =>
              fragmentDefs.has(fragment),
            );

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
      },
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.',
      requiresSchema: true,
      requiresSiblings: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'no-unused-variables',
      ruleName: 'NoUnusedVariables',
      getDocumentNode: handleMissingFragments,
    },
    {
      category: 'Operations',
      description:
        'A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.',
      requiresSchema: true,
      requiresSiblings: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'overlapping-fields-can-be-merged',
      ruleName: 'OverlappingFieldsCanBeMerged',
    },
    {
      category: 'Operations',
      description:
        'A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'possible-fragment-spread',
      ruleName: 'PossibleFragmentSpreads',
    },
    {
      category: 'Operations',
      description:
        'A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'possible-type-extension',
      ruleName: 'PossibleTypeExtensions',
    },
    {
      category: 'Schema',
      description: 'A type extension is only valid if the type is defined and has the same kind.',
      // TODO: add in graphql-eslint v4
      recommended: false,
      requiresSchema: true,
      isDisabledForAllConfig: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'provided-required-arguments',
      ruleName: 'ProvidedRequiredArguments',
    },
    {
      category: ['Schema', 'Operations'],
      description:
        'A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'scalar-leafs',
      ruleName: 'ScalarLeafs',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'one-field-subscriptions',
      ruleName: 'SingleFieldSubscriptions',
    },
    {
      category: 'Operations',
      description: 'A GraphQL subscription is valid only if it contains a single root field.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-argument-names',
      ruleName: 'UniqueArgumentNames',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL field or directive is only valid if all supplied arguments are uniquely named.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-directive-names',
      ruleName: 'UniqueDirectiveNames',
    },
    {
      category: 'Schema',
      description: 'A GraphQL document is only valid if all defined directives have unique names.',
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-directive-names-per-location',
      ruleName: 'UniqueDirectivesPerLocation',
    },
    {
      category: ['Schema', 'Operations'],
      description:
        'A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-enum-value-names',
      ruleName: 'UniqueEnumValueNames',
    },
    {
      category: 'Schema',
      description: 'A GraphQL enum type is only valid if all its values are uniquely named.',
      recommended: false,
      isDisabledForAllConfig: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-field-definition-names',
      ruleName: 'UniqueFieldDefinitionNames',
    },
    {
      category: 'Schema',
      description: 'A GraphQL complex type is only valid if all its fields are uniquely named.',
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-input-field-names',
      ruleName: 'UniqueInputFieldNames',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL input object value is only valid if all supplied fields are uniquely named.',
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-operation-types',
      ruleName: 'UniqueOperationTypes',
    },
    {
      category: 'Schema',
      description: 'A GraphQL document is only valid if it has only one type per operation.',
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-type-names',
      ruleName: 'UniqueTypeNames',
    },
    {
      category: 'Schema',
      description: 'A GraphQL document is only valid if all defined types have unique names.',
    },
  ),
  validationToRule(
    {
      ruleId: 'unique-variable-names',
      ruleName: 'UniqueVariableNames',
    },
    {
      category: 'Operations',
      description: 'A GraphQL operation is only valid if all its variables are uniquely named.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'value-literals-of-correct-type',
      ruleName: 'ValuesOfCorrectType',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL document is only valid if all value literals are of the type expected at their position.',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'variables-are-input-types',
      ruleName: 'VariablesAreInputTypes',
    },
    {
      category: 'Operations',
      description:
        'A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).',
      requiresSchema: true,
    },
  ),
  validationToRule(
    {
      ruleId: 'variables-in-allowed-position',
      ruleName: 'VariablesInAllowedPosition',
    },
    {
      category: 'Operations',
      description: 'Variables passed to field arguments conform to type.',
      requiresSchema: true,
    },
  ),
);
