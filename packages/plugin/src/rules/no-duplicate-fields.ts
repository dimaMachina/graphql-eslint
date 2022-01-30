import { Kind, NameNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const NO_DUPLICATE_FIELDS = 'NO_DUPLICATE_FIELDS';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.`,
      category: 'Operations',
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-duplicate-fields.md',
      recommended: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
              user {
                name
                email
                name # duplicate field
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
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
            query (
              $first: Int!
              $first: Int! # duplicate variable
            ) {
              users(first: $first, skip: 50) {
                id
              }
            }
          `,
        },
      ],
    },
    messages: {
      [NO_DUPLICATE_FIELDS]: `{{ type }} "{{ fieldName }}" defined multiple times`,
    },
    schema: [],
  },
  create(context) {
    function checkNode(usedFields: Set<string>, type: string, node: GraphQLESTreeNode<NameNode>): void {
      const fieldName = node.value;
      if (usedFields.has(fieldName)) {
        context.report({
          node,
          messageId: NO_DUPLICATE_FIELDS,
          data: {
            type,
            fieldName,
          },
        });
      } else {
        usedFields.add(fieldName);
      }
    }

    return {
      OperationDefinition(node) {
        const set = new Set<string>();
        for (const varDef of node.variableDefinitions) {
          checkNode(set, 'Operation variable', varDef.variable.name);
        }
      },
      Field(node) {
        const set = new Set<string>();
        for (const arg of node.arguments) {
          checkNode(set, 'Field argument', arg.name);
        }
      },
      SelectionSet(node) {
        const set = new Set<string>();
        for (const selection of node.selections) {
          if (selection.kind === Kind.FIELD) {
            checkNode(set, 'Field', selection.alias || selection.name);
          }
        }
      },
    };
  },
};

export default rule;
