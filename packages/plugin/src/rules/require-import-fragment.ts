import path from 'path';
import { NameNode } from 'graphql';
import { requireSiblingsOperations } from '../utils.js';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';

const RULE_ID = 'require-import-fragment';
const SUGGESTION_ID = 'add-import-expression';

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
            query {
              foo {
                ...FooFields
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # import 'bar.graphql'
            query {
              foo {
                ...FooFields
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # import FooFields from 'bar.graphql'
            query {
              foo {
                ...FooFields
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # import FooFields from 'foo.graphql'
            query {
              foo {
                ...FooFields
              }
            }
          `,
        },
      ],
      requiresSiblings: true,
    },
    hasSuggestions: true,
    messages: {
      [RULE_ID]: 'Expected "{{fragmentName}}" fragment to be imported.',
      [SUGGESTION_ID]: 'Add import expression for "{{fragmentName}}".',
    },
    schema: [],
  },
  create(context) {
    const definedFragments = new Set<string>();
    const fragmentSpreadNameNodes = new Set<GraphQLESTreeNode<NameNode>>();
    const comments = context.getSourceCode().getAllComments();
    const siblings = requireSiblingsOperations(RULE_ID, context);
    const filePath = context.getFilename();

    function checkFragmentSpreadNameNode(node: GraphQLESTreeNode<NameNode>): void {
      const fragmentName = node.value;

      if (definedFragments.has(fragmentName)) {
        return;
      }

      const fragmentsFromSiblings = siblings.getFragment(fragmentName);

      for (const comment of comments) {
        if (comment.type !== 'Line') continue;

        // 1. could start with extra whitespace
        // 2. match both named/default import
        const isPossibleImported = new RegExp(
          `^\\s*import\\s+(${fragmentName}\\s+from\\s+)?['"]`,
        ).test(comment.value);
        if (!isPossibleImported) continue;

        const extractedImportPath = comment.value.match(/(["'])((?:\1|.)*?)\1/)?.[2];
        if (!extractedImportPath) continue;

        const importPath = path.join(path.dirname(filePath), extractedImportPath);

        const hasInSiblings = fragmentsFromSiblings.some(source => source.filePath === importPath);
        if (hasInSiblings) return;
      }

      context.report({
        node,
        messageId: RULE_ID,
        data: { fragmentName },
        suggest: [
          {
            messageId: SUGGESTION_ID,
            data: { fragmentName },
            fix(fixer) {
              const suggestedPath = fragmentsFromSiblings.length
                ? path.relative(path.dirname(filePath), fragmentsFromSiblings[0].filePath)
                : 'CHANGE_ME.graphql';
              return fixer.insertTextBeforeRange(
                [0, 0],
                `# import ${fragmentName} from '${suggestedPath}'\n`,
              );
            },
          },
        ],
      });
    }

    return {
      'FragmentSpread .name'(node: GraphQLESTreeNode<NameNode>) {
        fragmentSpreadNameNodes.add(node);
      },
      'FragmentDefinition .name'(node: GraphQLESTreeNode<NameNode>) {
        definedFragments.add(node.value);
      },
      'Document:exit'() {
        for (const fragmentSpreadNameNode of fragmentSpreadNameNodes) {
          checkFragmentSpreadNameNode(fragmentSpreadNameNode);
        }
      },
    };
  },
};
