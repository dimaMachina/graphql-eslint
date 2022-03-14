import { ASTNode, ASTVisitor, FragmentDefinitionNode, Kind, NameNode, visit } from 'graphql';
import type { GraphQLESLintRule, ReportDescriptor } from '../types';
import type { SiblingOperations } from '../sibling-operations';
import { logger, requireSiblingsOperations } from '../utils';
import { convertLocation, GraphQLESTreeNode } from '../estree-parser';

const RULE_ID = 'no-duplicate-fields';

type MetaInfo = { fragmentName?: string; inlineFragmentName?: string };

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    // eslint-disable-next-line eslint-plugin/require-meta-has-suggestions
    hasSuggestions: true,
    docs: {
      description: `Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.`,
      category: 'Operations',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      recommended: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
              user {
                name
                email
                name # duplicate field
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
              users(
                first: 100
                skip: 50
                after: "cji629tngfgou0b73kt7vi5jo"
                first: 100 # duplicate argument
              ) {
                id
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query (
              $first: Int!
              $first: Int! # duplicate variable
            ) {
              users(first: $first, skip: 50) {
                id
              }
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: '{{ type }} `{{ fieldName }}` already defined{{ addition }}.',
    },
    schema: [],
  },
  create(context) {
    let siblings: SiblingOperations | null = null;

    try {
      siblings = requireSiblingsOperations(RULE_ID, context);
    } catch {
      logger.warn(
        `Rule "${RULE_ID}" works best with siblings operations loaded. For more info: https://bit.ly/graphql-eslint-operations`
      );
    }

    function checkNode(
      usedFields: Map<string, MetaInfo>,
      node: GraphQLESTreeNode<NameNode> | NameNode,
      parent = (node as any).parent,
      meta: MetaInfo = {}
    ): void {
      const fieldName = node.value;
      const field = usedFields.get(fieldName);
      if (!field) {
        usedFields.set(fieldName, meta);
        return;
      }

      let addition = '';
      if (field.fragmentName) {
        addition = ` in \`${field.fragmentName}\` fragment`;
      } else if (field.inlineFragmentName) {
        addition = ` in \`${field.inlineFragmentName}\` inline fragment`;
      }
      const problem: ReportDescriptor = {
        loc: 'startToken' in node.loc ? convertLocation(node.loc) : node.loc,
        messageId: RULE_ID,
        data: {
          type: parent.kind,
          fieldName,
          addition,
        },
      };

      if ('type' in node) {
        problem.suggest = [
          {
            desc: `Remove \`${fieldName}\` ${parent.type.toLowerCase()}`,
            fix(fixer) {
              return fixer.remove(parent.type === Kind.VARIABLE ? parent.parent : parent);
            },
          },
        ];
      }

      context.report(problem);
    }

    return {
      OperationDefinition(node) {
        const set = new Map();
        for (const varDef of node.variableDefinitions) {
          checkNode(set, varDef.variable.name);
        }
      },
      Field(node) {
        const set = new Map();
        for (const arg of node.arguments) {
          checkNode(set, arg.name);
        }
      },
      SelectionSet(selectionSet) {
        const set = new Map();

        const visitor: ASTVisitor = {
          Field(node, _, _2, _3, ancestors): false | void {
            const parent = ancestors[ancestors.length - 2] as ASTNode;
            let meta: MetaInfo;
            if (parent) {
              if (parent.kind === Kind.INLINE_FRAGMENT) {
                meta = { inlineFragmentName: parent.typeCondition.name.value };
              } else if (parent.kind === Kind.FRAGMENT_DEFINITION) {
                meta = { fragmentName: parent.name.value };
              }
            }
            checkNode(set, node.alias || node.name, node, meta);
            if (node.selectionSet) {
              // Skip visiting node if field contains selections
              return false;
            }
          },
          FragmentSpread(spread): FragmentDefinitionNode | void {
            const [fragment] = siblings.getFragment(spread.name.value);
            if (fragment) {
              return {
                ...fragment.document,
                selectionSet: {
                  ...fragment.document.selectionSet,
                  selections: fragment.document.selectionSet.selections.map(node => {
                    const enhancedNode = { ...node };
                    if ('name' in enhancedNode) {
                      enhancedNode.name = { ...enhancedNode.name, loc: spread.name.loc };
                    }
                    return enhancedNode;
                  }),
                },
              };
            }
          },
        };

        visit(selectionSet.rawNode(), visitor);
      },
    };
  },
};

export default rule;
