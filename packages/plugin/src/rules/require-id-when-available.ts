import {
  FragmentSpreadNode,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLOutputType,
  Kind,
  SelectionSetNode,
  TypeInfo,
  visit,
  visitWithTypeInfo,
} from 'graphql';
import type * as ESTree from 'estree';
import { asArray } from '@graphql-tools/utils';
import { ARRAY_DEFAULT_OPTIONS, requireGraphQLSchemaFromContext, requireSiblingsOperations } from '../utils';
import { GraphQLESLintRule, OmitRecursively, ReportDescriptor } from '../types';
import { getBaseType, GraphQLESTreeNode } from '../estree-parser';

export type RequireIdWhenAvailableRuleConfig = { fieldName: string | string[] };

const RULE_ID = 'require-id-when-available';
const DEFAULT_ID_FIELD_NAME = 'id';

declare namespace Intl {
  class ListFormat {
    constructor(locales: string, options: any);

    public format: (items: [string]) => string;
  }
}

const englishJoinWords = words => new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);

const rule: GraphQLESLintRule<[RequireIdWhenAvailableRuleConfig], true> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Operations',
      description: 'Enforce selecting specific fields when they are available on the GraphQL type.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
          `,
        },
      ],
      recommended: true,
    },
    messages: {
      [RULE_ID]: `Field{{ pluralSuffix }} {{ fieldName }} must be selected when it's available on a type.\nInclude it in your selection set{{ addition }}.`,
    },
    schema: {
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
    },
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const siblings = requireSiblingsOperations(RULE_ID, context);
    const { fieldName = DEFAULT_ID_FIELD_NAME } = context.options[0] || {};
    const idNames = asArray(fieldName);

    // Check selections only in OperationDefinition,
    // skip selections of OperationDefinition and InlineFragment
    const selector = 'OperationDefinition SelectionSet[parent.kind!=/(^OperationDefinition|InlineFragment)$/]';
    const typeInfo = new TypeInfo(schema);

    function checkNode(
      node: OmitRecursively<SelectionSetNode, 'loc'>,
      type: GraphQLOutputType,
      loc: ESTree.Position, // Provide fragment spread location instead location of selection in fragment
      parent: any, // Can't access to node.parent in GraphQL AST.Node, so pass as argument
      checkedFragmentSpreads = new Set<string>()
    ): void {
      const rawType = getBaseType(type);
      const isObjectType = rawType instanceof GraphQLObjectType;
      const isInterfaceType = rawType instanceof GraphQLInterfaceType;
      if (!isObjectType && !isInterfaceType) {
        return;
      }
      const fields = rawType.getFields();
      const hasIdFieldInType = idNames.some(name => fields[name]);
      if (!hasIdFieldInType) {
        return;
      }

      function hasIdField({ selections }: typeof node): boolean {
        return selections.some(selection => {
          if (selection.kind === Kind.FIELD) {
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

      const fragmentSpreads = node.selections.filter(
        selection => selection.kind === Kind.FRAGMENT_SPREAD
      ) as GraphQLESTreeNode<FragmentSpreadNode>[];

      for (const fragmentSpread of fragmentSpreads) {
        const [foundSpread] = siblings.getFragment(fragmentSpread.name.value);
        if (foundSpread) {
          const checkedFragmentSpreads = new Set<string>();
          const visitor = visitWithTypeInfo(typeInfo, {
            SelectionSet(node, key, parent, path, ancestors) {
              if ('kind' in parent) {
                if (ancestors.length > 0 && parent.kind !== Kind.INLINE_FRAGMENT) {
                  checkNode(node, typeInfo.getType(), fragmentSpread.loc.start, parent, checkedFragmentSpreads);
                } else if (parent.kind === Kind.FRAGMENT_DEFINITION) {
                  checkedFragmentSpreads.add(parent.name.value);
                }
              }
            },
          });
          visit(foundSpread.document, visitor);
        }
      }

      if (hasId) {
        return;
      }

      const pluralSuffix = idNames.length > 1 ? 's' : '';
      const fieldName = englishJoinWords(
        idNames.map(name => `\`${checkedFragmentSpreads.size > 0 ? `${parent.name.value}.` : ''}${name}\``)
      );

      const addition =
        checkedFragmentSpreads.size === 0
          ? ''
          : ` or add to used fragment${checkedFragmentSpreads.size > 1 ? 's' : ''} ${englishJoinWords(
              [...checkedFragmentSpreads].map(name => `\`${name}\``)
            )}`;

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
          fix: fixer => fixer.insertTextBefore((node as any).selections[0], `${idName} `),
        }));
      }
      context.report(problem);
    }

    return {
      [selector](node: GraphQLESTreeNode<SelectionSetNode, true>) {
        const typeInfo = node.typeInfo();
        if (typeInfo.gqlType) {
          checkNode(node, typeInfo.gqlType, node.loc.start, (node as any).parent);
        }
      },
    };
  },
};

export default rule;
