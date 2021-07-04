import { relative } from 'path';
import { FragmentDefinitionNode, Kind, OperationDefinitionNode } from 'graphql';
import { GraphQLESLintRule, GraphQLESLintRuleContext } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';
import { normalizePath, requireSiblingsOperations, getOnDiskFilepath } from '../utils';
import { FragmentSource, OperationSource } from '../sibling-operations';

const RULE_NAME = 'unique-fragment-name';
const UNIQUE_FRAGMENT_NAME = 'UNIQUE_FRAGMENT_NAME';

export const checkNode = (
  context: GraphQLESLintRuleContext,
  node: GraphQLESTreeNode<OperationDefinitionNode | FragmentDefinitionNode>,
  ruleName: string,
  messageId: string
): void => {
  const documentName = node.name?.value;
  if (!documentName) {
    return;
  }

  const siblings = requireSiblingsOperations(ruleName, context);
  const siblingDocuments: (FragmentSource | OperationSource)[] =
    node.kind === Kind.FRAGMENT_DEFINITION ? siblings.getFragment(documentName) : siblings.getOperation(documentName);
  const realFilepath = getOnDiskFilepath(context.getFilename());

  const conflictingDocuments = siblingDocuments.filter(f => {
    const isSameName = f.document.name?.value === documentName;
    const isSamePath = normalizePath(f.filePath) === normalizePath(realFilepath);
    return isSameName && !isSamePath;
  });

  if (conflictingDocuments.length > 0) {
    const { start, end } = node.name.loc;
    context.report({
      messageId,
      data: {
        documentName,
        summary: conflictingDocuments.map(f => `\t${relative(process.cwd(), f.filePath)}`).join('\n'),
      },
      loc: {
        start: {
          line: start.line,
          column: start.column - 1,
        },
        end: {
          line: end.line,
          column: end.column - 1,
        },
      },
    });
  }
};

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: `Enforce unique fragment names across your project.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_NAME}.md`,
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
      [UNIQUE_FRAGMENT_NAME]: 'Fragment named "{{ documentName }}" already defined in:\n{{ summary }}',
    },
  },
  create(context) {
    return {
      FragmentDefinition(node) {
        checkNode(context, node, RULE_NAME, UNIQUE_FRAGMENT_NAME);
      },
    };
  },
};

export default rule;
