import { Kind } from 'graphql';
import { GraphQLESLintRule } from '../types';

const AVOID_DUPLICATE_FIELDS = 'AVOID_DUPLICATE_FIELDS';

const ensureUnique = () => {
  const set = new Set<string>();

  return {
    add: (item: string, onError: () => void) => {
      if (set.has(item)) {
        onError();
      } else {
        set.add(item);
      }
    },
  };
};

const rule: GraphQLESLintRule<[], false> = {
  meta: {
    type: 'suggestion',
    docs: {
      requiresSchema: false,
      requiresSiblings: false,
      description:
        'Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.',
      category: 'Stylistic Issues',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/avoid-duplicate-fields.md',
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query getUserDetails {
              user {
                name # first
                email
                name # second
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query getUsers {
              users(
                first: 100
                skip: 50
                after: "cji629tngfgou0b73kt7vi5jo"
                first: 100 # duplicate argument
              ) {
                id
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query getUsers($first: Int!, $first: Int!) {
              # Duplicate variable
              users(first: 100, skip: 50, after: "cji629tngfgou0b73kt7vi5jo") {
                id
              }
            }
          `,
        },
      ],
    },
    messages: {
      [AVOID_DUPLICATE_FIELDS]: `{{ type }} "{{ fieldName }}" defined multiple times.`,
    },
  },
  create(context) {
    return {
      OperationDefinition(node) {
        const uniqueCheck = ensureUnique();

        for (const arg of node.variableDefinitions || []) {
          uniqueCheck.add(arg.variable.name.value, () => {
            context.report({
              messageId: AVOID_DUPLICATE_FIELDS,
              data: {
                type: 'Operation variable',
                fieldName: arg.variable.name.value,
              },
              node: arg,
            });
          });
        }
      },
      Field(node) {
        const uniqueCheck = ensureUnique();

        for (const arg of node.arguments || []) {
          uniqueCheck.add(arg.name.value, () => {
            context.report({
              messageId: AVOID_DUPLICATE_FIELDS,
              data: {
                type: 'Field argument',
                fieldName: arg.name.value,
              },
              node: arg,
            });
          });
        }
      },
      SelectionSet(node) {
        const uniqueCheck = ensureUnique();

        for (const selection of node.selections || []) {
          if (selection.kind === Kind.FIELD) {
            const nameToCheck = selection.alias?.value || selection.name.value;

            uniqueCheck.add(nameToCheck, () => {
              context.report({
                messageId: AVOID_DUPLICATE_FIELDS,
                data: {
                  type: 'Field',
                  fieldName: nameToCheck,
                },
                node: selection,
              });
            });
          }
        }
      },
    };
  },
};

export default rule;
