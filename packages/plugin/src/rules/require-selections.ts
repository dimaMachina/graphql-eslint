import * as ESTree from 'estree';
import {
  ASTNode,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLUnionType,
  Kind,
  SelectionSetNode,
  TypeInfo,
  visit,
  visitWithTypeInfo,
} from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { asArray } from '@graphql-tools/utils';
import { getBaseType, GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule, OmitRecursively, ReportDescriptor } from '../types.js';
import {
  ARRAY_DEFAULT_OPTIONS,
  englishJoinWords,
  requireGraphQLSchemaFromContext,
  requireSiblingsOperations,
} from '../utils.js';

const RULE_ID = 'require-selections';
const DEFAULT_ID_FIELD_NAME = 'id';

const schema = {
  definitions: {
    asString: {
      type: 'string',
    },
    asArray: ARRAY_DEFAULT_OPTIONS,
  },
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      fieldName: {
        oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asArray' }],
        default: DEFAULT_ID_FIELD_NAME,
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions, true> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Operations',
      description: 'Enforce selecting specific fields when they are available on the GraphQL type.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      requiresSchema: true,
      requiresSiblings: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # In your schema
            type User {
              id: ID!
              name: String!
            }

            # Query
            query {
              user {
                name
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # In your schema
            type User {
              id: ID!
              name: String!
            }

            # Query
            query {
              user {
                id
                name
              }
            }

            # Selecting \`id\` with an alias is also valid
            query {
              user {
                id: name
              }
            }
          `,
        },
      ],
      recommended: true,
    },
    messages: {
      [RULE_ID]:
        "Field{{ pluralSuffix }} {{ fieldName }} must be selected when it's available on a type.\nInclude it in your selection set{{ addition }}.",
    },
    schema,
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const siblings = requireSiblingsOperations(RULE_ID, context);
    const { fieldName = DEFAULT_ID_FIELD_NAME } = context.options[0] || {};
    const idNames = asArray(fieldName);

    // Check selections only in OperationDefinition,
    // skip selections of OperationDefinition and InlineFragment
    const selector =
      'OperationDefinition SelectionSet[parent.kind!=/(^OperationDefinition|InlineFragment)$/]';
    const typeInfo = new TypeInfo(schema);

    function checkFragments(node: GraphQLESTreeNode<SelectionSetNode>): void {
      for (const selection of node.selections) {
        if (selection.kind !== Kind.FRAGMENT_SPREAD) {
          continue;
        }

        const [foundSpread] = siblings.getFragment(selection.name.value);
        if (!foundSpread) {
          continue;
        }

        const checkedFragmentSpreads = new Set<string>();
        const visitor = visitWithTypeInfo(typeInfo, {
          SelectionSet(node, key, _parent) {
            const parent = _parent as ASTNode;
            if (parent.kind === Kind.FRAGMENT_DEFINITION) {
              checkedFragmentSpreads.add(parent.name.value);
            } else if (parent.kind !== Kind.INLINE_FRAGMENT) {
              checkSelections(
                node,
                typeInfo.getType()!,
                selection.loc.start,
                parent,
                checkedFragmentSpreads,
              );
            }
          },
        });

        visit(foundSpread.document, visitor);
      }
    }

    function checkSelections(
      node: OmitRecursively<SelectionSetNode, 'loc'>,
      type: GraphQLOutputType,
      // Fragment can be placed in separate file
      // Provide actual fragment spread location instead of location in fragment
      loc: ESTree.Position,
      // Can't access to node.parent in GraphQL AST.Node, so pass as argument
      parent: any,
      checkedFragmentSpreads = new Set<string>(),
    ): void {
      const rawType = getBaseType(type);

      if (rawType instanceof GraphQLObjectType || rawType instanceof GraphQLInterfaceType) {
        checkFields(rawType);
      } else if (rawType instanceof GraphQLUnionType) {
        for (const selection of node.selections) {
          if (selection.kind === Kind.INLINE_FRAGMENT) {
            const types = rawType.getTypes();
            const t = types.find(t => t.name === selection.typeCondition!.name.value);
            if (t) {
              checkFields(t);
            }
          }
        }
      }

      function checkFields(rawType: GraphQLInterfaceType | GraphQLObjectType) {
        const fields = rawType.getFields();
        const hasIdFieldInType = idNames.some(name => fields[name]);

        if (!hasIdFieldInType) {
          return;
        }

        function hasIdField({ selections }: typeof node): boolean {
          return selections.some(selection => {
            if (selection.kind === Kind.FIELD) {
              if (selection.alias && idNames.includes(selection.alias.value)) {
                return true;
              }

              return idNames.includes(selection.name.value);
            }

            if (selection.kind === Kind.INLINE_FRAGMENT) {
              return hasIdField(selection.selectionSet);
            }

            if (selection.kind === Kind.FRAGMENT_SPREAD) {
              const [foundSpread] = siblings.getFragment(selection.name.value);
              if (foundSpread) {
                const fragmentSpread = foundSpread.document;
                checkedFragmentSpreads.add(fragmentSpread.name.value);
                return hasIdField(fragmentSpread.selectionSet);
              }
            }
            return false;
          });
        }

        const hasId = hasIdField(node);

        checkFragments(node as GraphQLESTreeNode<SelectionSetNode>);

        if (hasId) {
          return;
        }

        const pluralSuffix = idNames.length > 1 ? 's' : '';
        const fieldName = englishJoinWords(
          idNames.map(name => `\`${(parent.alias || parent.name).value}.${name}\``),
        );

        const addition =
          checkedFragmentSpreads.size === 0
            ? ''
            : ` or add to used fragment${
                checkedFragmentSpreads.size > 1 ? 's' : ''
              } ${englishJoinWords([...checkedFragmentSpreads].map(name => `\`${name}\``))}`;

        const problem: ReportDescriptor = {
          loc,
          messageId: RULE_ID,
          data: {
            pluralSuffix,
            fieldName,
            addition,
          },
        };

        // Don't provide suggestions for selections in fragments as fragment can be in a separate file
        if ('type' in node) {
          problem.suggest = idNames.map(idName => ({
            desc: `Add \`${idName}\` selection`,
            fix: fixer => {
              let insertNode = (node as any).selections[0];
              insertNode =
                insertNode.kind === Kind.INLINE_FRAGMENT
                  ? insertNode.selectionSet.selections[0]
                  : insertNode;
              return fixer.insertTextBefore(insertNode, `${idName} `);
            },
          }));
        }
        context.report(problem);
      }
    }

    return {
      [selector](node: GraphQLESTreeNode<SelectionSetNode, true>) {
        const typeInfo = node.typeInfo();
        if (typeInfo.gqlType) {
          checkSelections(node, typeInfo.gqlType, node.loc.start, node.parent);
        }
      },
    };
  },
};
