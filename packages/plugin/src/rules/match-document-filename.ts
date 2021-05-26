import { GraphQLESLintRule } from '../types';
import { basename } from 'path';
import { OperationTypeNode } from 'graphql';

const MATCH_DOCUMENT_FILENAME = 'MATCH_DOCUMENT_FILENAME';

type MatchDocumentFilenameRuleConfig = [
  {
    compareSections: boolean;
    ignoreCase: boolean;
  }
];

function checkNameValidity(
  docName: string,
  docType: OperationTypeNode | 'fragment',
  fileName: string,
  options: MatchDocumentFilenameRuleConfig[number]
): boolean {
  return true;
}

const rule: GraphQLESLintRule<MatchDocumentFilenameRuleConfig, false> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: `This rule allow you to enforce that the file name should match the operation name.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/match-document-filename.md`,
      requiresSchema: false,
      requiresSiblings: false,
      examples: [
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # me.graphql
            query me {
              me {
                id
                name
                fullName
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # user-by-id.graphql
            query me {
              me {
                id
                name
                fullName
              }
            }
          `,
        },
      ],
    },
    messages: {
      [MATCH_DOCUMENT_FILENAME]: `The {{ type }} "{{ name }}" is named differnly than the filename ("{{ filename }}").`,
    },
    schema: [
      {
        type: 'object',
        properties: {
          compareSections: {
            type: 'boolean',
            default: true,
          },
          ignoreCase: {
            type: 'boolean',
            default: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options: MatchDocumentFilenameRuleConfig[number] = context.options[0] || {
      compareSections: true,
      ignoreCase: true,
    };

    return {
      OperationDefinition: node => {
        const operationName = node.name?.value;
        const fileName = basename(context.getFilename());

        if (operationName && fileName) {
          const isValid = checkNameValidity(operationName, node.operation, fileName, options);

          if (!isValid) {
            context.report({
              node,
              messageId: MATCH_DOCUMENT_FILENAME,
              data: {
                type: node.operation,
                name: operationName,
                filename: fileName,
              },
            });
          }
        }
      },
      FragmentDefinition: node => {
        const fragmentName = node.name?.value;
        const fileName = basename(context.getFilename());

        if (fragmentName && fileName) {
          const isValid = checkNameValidity(fragmentName, 'fragment', fileName, options);

          if (!isValid) {
            context.report({
              node,
              messageId: MATCH_DOCUMENT_FILENAME,
              data: {
                type: 'fragment',
                name: fragmentName,
                filename: fileName,
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
