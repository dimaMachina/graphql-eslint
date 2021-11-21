import { GraphQLESLintRule } from '../types';
import depthLimit from 'graphql-depth-limit';
import { DocumentNode, FragmentDefinitionNode, GraphQLError, Kind, OperationDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-parser';
import { getLocation, requireSiblingsOperations } from '../utils';
import { SiblingOperations } from '../sibling-operations';

type SelectionSetDepthRuleConfig = { maxDepth: number; ignore?: string[] };

const rule: GraphQLESLintRule<[SelectionSetDepthRuleConfig]> = {
  meta: {
    docs: {
      category: 'Operations',
      description: `Limit the complexity of the GraphQL operations solely by their depth. Based on [graphql-depth-limit](https://github.com/stems/graphql-depth-limit).`,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/selection-set-depth.md',
      requiresSiblings: true,
      examples: [
        {
          title: 'Incorrect',
          usage: [{ maxDepth: 1 }],
          code: `
            query deep2 {
              viewer { # Level 0
                albums { # Level 1
                  title # Level 2
                }
              }
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ maxDepth: 4 }],
          code: `
            query deep2 {
              viewer { # Level 0
                albums { # Level 1
                  title # Level 2
                }
              }
            }
          `,
        },
        {
          title: 'Correct (ignored field)',
          usage: [{ maxDepth: 1, ignore: ['albums'] }],
          code: `
            query deep2 {
              viewer { # Level 0
                albums { # Level 1
                  title # Level 2
                }
              }
            }
          `,
        },
      ],
      recommended: true,
      configOptions: [{ maxDepth: 7 }],
    },
    type: 'suggestion',
    schema: {
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['maxDepth'],
        properties: {
          maxDepth: {
            type: 'number',
          },
          ignore: {
            type: 'array',
            uniqueItems: true,
            minItems: 1,
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  create(context) {
    let siblings: SiblingOperations | null = null;

    try {
      siblings = requireSiblingsOperations('selection-set-depth', context);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        `Rule "selection-set-depth" works best with siblings operations loaded. For more info: http://bit.ly/graphql-eslint-operations`
      );
    }

    const maxDepth = context.options[0].maxDepth;
    const ignore = context.options[0].ignore || [];
    const checkFn = depthLimit(maxDepth, { ignore });

    return {
      'OperationDefinition, FragmentDefinition'(
        node: GraphQLESTreeNode<OperationDefinitionNode | FragmentDefinitionNode>
      ) {
        try {
          const rawNode = node.rawNode();
          const fragmentsInUse = siblings ? siblings.getFragmentsInUse(rawNode, true) : [];
          const document: DocumentNode = {
            kind: Kind.DOCUMENT,
            definitions: [rawNode, ...fragmentsInUse],
          };

          checkFn({
            getDocument: () => document,
            reportError: (error: GraphQLError) => {
              context.report({
                loc: getLocation({ start: error.locations[0] }),
                message: error.message,
              });
            },
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(
            `Rule "selection-set-depth" check failed due to a missing siblings operations. For more info: http://bit.ly/graphql-eslint-operations`,
            e
          );
        }
      },
    };
  },
};

export default rule;
