import { relative } from 'path';
import { ExecutableDefinitionNode, Kind } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { FragmentSource, OperationSource, SiblingOperations } from '../siblings.js';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types.js';
import { CWD, normalizePath, requireSiblingsOperations, VIRTUAL_DOCUMENT_REGEX } from '../utils.js';

const RULE_ID = 'unique-fragment-name';

export const checkNode = (
  context: GraphQLESLintRuleContext,
  node: GraphQLESTreeNode<ExecutableDefinitionNode>,
  ruleId: string,
  siblings: SiblingOperations,
): void => {
  const documentName = node.name!.value;
  const siblingDocuments: (FragmentSource | OperationSource)[] =
    node.kind === Kind.FRAGMENT_DEFINITION
      ? siblings.getFragment(documentName)
      : siblings.getOperation(documentName);
  const filepath = context.getFilename();

  const conflictingDocuments = siblingDocuments.filter(f => {
    const isSameName = f.document.name?.value === documentName;
    const isSamePath = normalizePath(f.filePath) === normalizePath(filepath);
    return isSameName && !isSamePath;
  });

  if (conflictingDocuments.length > 0) {
    context.report({
      messageId: ruleId,
      data: {
        documentName,
        summary: conflictingDocuments
          .map(f => `\t${relative(CWD, f.filePath.replace(VIRTUAL_DOCUMENT_REGEX, ''))}`)
          .join('\n'),
      },
      // @ts-expect-error name will exist
      node: node.name,
    });
  }
};

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: 'Enforce unique fragment names across your project.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      requiresSiblings: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # user.fragment.graphql
            fragment UserFields on User {
              id
              name
              fullName
            }

            # user-fields.graphql
            fragment UserFields on User {
              id
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # user.fragment.graphql
            fragment AllUserFields on User {
              id
              name
              fullName
            }

            # user-fields.graphql
            fragment UserFields on User {
              id
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: 'Fragment named "{{ documentName }}" already defined in:\n{{ summary }}',
    },
    schema: [],
  },
  create(context) {
    const siblings = requireSiblingsOperations(context);
    if (!siblings) return {};
    return {
      FragmentDefinition(node) {
        checkNode(context, node, RULE_ID, siblings);
      },
    };
  },
};
