import { Kind, NameNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const RULE_ID = 'no-duplicate-fields';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      description: `Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.`,
      category: 'Operations',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
      [RULE_ID]: '{{ type }} `{{ fieldName }}` defined multiple times.',
    },
    schema: [],
  },
  create(context) {
    function checkNode(usedFields: Set<string>, node: GraphQLESTreeNode<NameNode>): void {
      const fieldName = node.value;
      if (usedFields.has(fieldName)) {
        const { parent } = node as any;
        context.report({
          node,
          messageId: RULE_ID,
          data: {
            type: parent.type,
            fieldName,
          },
          suggest: [
            {
              desc: `Remove \`${fieldName}\` ${parent.type.toLowerCase()}`,
              fix(fixer) {
                return fixer.remove(parent.type === Kind.VARIABLE ? parent.parent : parent);
              },
            },
          ],
        });
      } else {
        usedFields.add(fieldName);
      }
    }

    return {
      OperationDefinition(node) {
        const set = new Set<string>();
        for (const varDef of node.variableDefinitions) {
          checkNode(set, varDef.variable.name);
        }
      },
      Field(node) {
        const set = new Set<string>();
        for (const arg of node.arguments) {
          checkNode(set, arg.name);
        }
      },
      SelectionSet(node) {
        const set = new Set<string>();
        for (const selection of node.selections) {
          if (selection.kind === Kind.FIELD) {
            checkNode(set, selection.alias || selection.name);
          }
        }
      },
    };
  },
};

export default rule;
