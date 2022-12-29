import { DocumentNode, Token, TokenKind } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';

const HASHTAG_COMMENT = 'HASHTAG_COMMENT';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    schema: [],
    messages: {
      [HASHTAG_COMMENT]:
        'Using hashtag `#` for adding GraphQL descriptions is not allowed. Prefer using `"""` for multiline, or `"` for a single line description.',
    },
    docs: {
      description:
        'Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.\nAllows to use hashtag for comments, as long as it\'s not attached to an AST definition.',
      category: 'Schema',
      url: 'https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-hashtag-description.md',
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # Represents a user
            type User {
              id: ID!
              name: String
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            " Represents a user "
            type User {
              id: ID!
              name: String
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # This file defines the basic User type.
            # This comment is valid because it's not attached specifically to an AST object.

            " Represents a user "
            type User {
              id: ID! # This one is also valid, since it comes after the AST object
              name: String
            }
          `,
        },
      ],
      recommended: true,
    },
  },
  create(context) {
    const selector = 'Document[definitions.0.kind!=/^(OperationDefinition|FragmentDefinition)$/]';
    return {
      [selector](node: GraphQLESTreeNode<DocumentNode>) {
        const rawNode = node.rawNode();
        let token: Token = rawNode.loc!.startToken;

        while (token) {
          const { kind, prev, next, value, line, column } = token;
          if (kind === TokenKind.COMMENT && prev && next) {
            // TODO: remove `!` when drop support of graphql@15
            const isEslintComment = value!.trimStart().startsWith('eslint');
            const linesAfter = next.line - line;

            if (
              !isEslintComment &&
              line !== prev.line &&
              next.kind === TokenKind.NAME &&
              linesAfter < 2
            ) {
              context.report({
                messageId: HASHTAG_COMMENT,
                loc: {
                  line,
                  column: column - 1,
                },
                suggest: ['"""', '"'].map(descriptionSyntax => ({
                  desc: `Replace with \`${descriptionSyntax}\` description syntax`,
                  fix: fixer =>
                    fixer.replaceTextRange(
                      [token.start, token.end] as [number, number],
                      // TODO: remove `!` when drop support of graphql@15
                      [descriptionSyntax, value!.trim(), descriptionSyntax].join(''),
                    ),
                })),
              });
            }
          }
          if (!next) {
            break;
          }
          token = next;
        }
      },
    };
  },
};
