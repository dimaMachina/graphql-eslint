import { GraphQLESLintRule } from '../types';
import { TokenKind } from 'graphql';
import { checkForEslint } from '../utils';

const HASHTAG_COMMENT = 'HASHTAG_COMMENT';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [HASHTAG_COMMENT]: `Using hashtag (#) for adding GraphQL descriptions is not allowed. Prefer using """ for multiline, or " for a single line description.`,
    },
    docs: {
      description: `Requires to use """ or " for adding a GraphQL description instead of #.\nThis rule allows you to use hashtag for comments, as long as it's not attached to a AST definition.`,
      category: 'Best Practices',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-hashtag-description.md`,
      requiresSchema: false,
      requiresSiblings: false,
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
    },
    type: 'suggestion',
  },
  create(context) {
    return {
      Document(node) {
        if (node) {
          const rawNode = node.rawNode();

          if (rawNode && rawNode.loc && rawNode.loc.startToken) {
            let token = rawNode.loc.startToken;

            while (token !== null) {
              if (token.kind === TokenKind.COMMENT && token.next && token.prev) {
                if (
                  token.prev.kind !== TokenKind.SOF &&
                  token.prev.kind !== TokenKind.COMMENT &&
                  token.next.kind !== TokenKind.COMMENT &&
                  token.next.line - token.line > 1 &&
                  token.prev.line !== token.line
                ) {
                  context.report({
                    messageId: HASHTAG_COMMENT,
                    loc: {
                      start: {
                        line: token.line,
                        column: token.column,
                      },
                      end: {
                        line: token.line,
                        column: token.column,
                      },
                    },
                  });
                } else if (
                  token.next.kind !== TokenKind.COMMENT &&
                  !checkForEslint(token, rawNode) &&
                  token.next.kind !== TokenKind.EOF &&
                  token.next.line - token.line < 2 &&
                  token.prev.line !== token.line
                ) {
                  context.report({
                    messageId: HASHTAG_COMMENT,
                    loc: {
                      start: {
                        line: token.line,
                        column: token.column,
                      },
                      end: {
                        line: token.line,
                        column: token.column,
                      },
                    },
                  });
                }
              }

              token = token.next;
            }
          }
        }
      },
    };
  },
};

export default rule;
