import { GraphQLESLintRule } from '../types';
import { requireSiblingsOperations } from '../utils';

const UNIQUE_FRAGMENT_NAME = 'UNIQUE_FRAGMENT_NAME';

const rule: GraphQLESLintRule<[], false> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: `This rule allow you to enforce unique fragment name across your application.`,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/unique-fragment-name.md`,
      requiresSchema: false,
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
      [UNIQUE_FRAGMENT_NAME]: `Fragment named "{{ fragmentName }}" already defined in:\n{{ fragmentsSummary }}`,
    },
  },
  create(context) {
    return {
      FragmentDefinition: node => {
        const fragmentName = node.name?.value;
        const siblings = requireSiblingsOperations('unique-fragment-name', context);

        if (fragmentName) {
          const siblingFragments = siblings.getFragment(fragmentName);

          const conflictingFragments = siblingFragments.filter(
            f => f.document.name?.value === fragmentName && f.filePath !== context.getFilename()
          );

          if (conflictingFragments.length > 0) {
            context.report({
              loc: {
                start: {
                  line: node.name.loc.start.line,
                  column: node.name.loc.start.column - 1,
                },
                end: {
                  line: node.name.loc.end.line,
                  column: node.name.loc.end.column - 1,
                },
              },
              messageId: UNIQUE_FRAGMENT_NAME,
              data: {
                fragmentName,
                fragmentsSummary: conflictingFragments.map(f => `\t${f.filePath}`).join('\n'),
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
