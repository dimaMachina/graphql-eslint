import { NameNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';

const RULE_ID = 'require-import-fragment';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: 'Require fragments to be imported via an import expression.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query MyQuery {
              fooField {
                ...Foo
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # import Bar from 'bar.graphql'
            # import 'foo.graphql'

            query MyQuery {
              fooField {
                ...Foo
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # import Foo from 'foo.graphql'

            query MyQuery {
              fooField {
                ...Foo
              }
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: "Expected '{{name}}' fragment to be imported.",
    },
    schema: [],
  },
  create(context) {
    return {
      'FragmentSpread > Name'(node: GraphQLESTreeNode<NameNode>) {
        const fragmentName = node.value;
        const comments = context.getSourceCode().getAllComments();

        for (const comment of comments) {
          if (
            comment.type === 'Line' &&
            comment.value.trim().startsWith(`import ${fragmentName} from `)
          ) {
            return;
          }
        }

        context.report({
          node,
          messageId: RULE_ID,
          data: {
            name: fragmentName,
          },
        });
      },
    };
  },
};
