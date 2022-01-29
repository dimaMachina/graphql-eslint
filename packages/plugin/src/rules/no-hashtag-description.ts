import { DocumentNode, TokenKind } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const HASHTAG_COMMENT = 'HASHTAG_COMMENT';

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [HASHTAG_COMMENT]: `Using hashtag (#) for adding GraphQL descriptions is not allowed. Prefer using """ for multiline, or " for a single line description.`,
    },
    docs: {
      description:
        'Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.\nAllows to use hashtag for comments, as long as it\'s not attached to an AST definition.',
      category: 'Schema',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-hashtag-description.md',
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
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    const selector = 'Document[definitions.0.kind!=/^(OperationDefinition|FragmentDefinition)$/]';
    return {
      [selector](node: GraphQLESTreeNode<DocumentNode>) {
        const rawNode = node.rawNode();
        let token = rawNode.loc.startToken;

        while (token !== null) {
          const { kind, prev, next, value, line, column } = token;

          if (kind === TokenKind.COMMENT && prev && next) {
            const isEslintComment = value.trimStart().startsWith('eslint');
            const linesAfter = next.line - line;

            if (!isEslintComment && line !== prev.line && next.kind === TokenKind.NAME && linesAfter < 2) {
              context.report({
                messageId: HASHTAG_COMMENT,
                loc: {
                  line,
                  column: column - 1,
                },
              });
            }
          }
          token = next;
        }
      },
    };
  },
};

export default rule;
