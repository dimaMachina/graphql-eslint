import {
  ASTNode,
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
    // eslint-disable-next-line eslint-plugin/require-meta-has-suggestions
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
          SelectionSet(node, key, parent: ASTNode) {
            if (parent.kind === Kind.FRAGMENT_DEFINITION) {
              checkedFragmentSpreads.add(parent.name.value);
            } else if (parent.kind !== Kind.INLINE_FRAGMENT) {
              checkSelections(node, typeInfo.getType(), selection.loc.start, parent, checkedFragmentSpreads);
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

      checkFragments(node as GraphQLESTreeNode<SelectionSetNode>);

      if (hasId) {
        return;
      }

      const pluralSuffix = idNames.length > 1 ? 's' : '';
      const fieldName = englishJoinWords(idNames.map(name => `\`${(parent.alias || parent.name).value}.${name}\``));

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
          checkSelections(node, typeInfo.gqlType, node.loc.start, (node as any).parent);
        }
      },
    };
  },
};

export default rule;
