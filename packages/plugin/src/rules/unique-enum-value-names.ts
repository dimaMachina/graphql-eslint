import { EnumTypeDefinitionNode, EnumTypeExtensionNode, Kind } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { getNodeName } from '../utils.js';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      url: 'https://the-guild.dev/graphql/eslint/rules/unique-enum-value-names',
      category: 'Schema',
      recommended: true,
      description: `A GraphQL enum type is only valid if all its values are uniquely named.
> This rule disallows case-insensitive enum values duplicates too.`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            enum MyEnum {
              Value
              VALUE
              ValuE
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            enum MyEnum {
              Value1
              Value2
              Value3
            }
          `,
        },
      ],
    },
    schema: [],
  },
  create(context) {
    const selector = [Kind.ENUM_TYPE_DEFINITION, Kind.ENUM_TYPE_EXTENSION].join(',');
    return {
      [selector](node: GraphQLESTreeNode<EnumTypeDefinitionNode | EnumTypeExtensionNode>) {
        const duplicates = node.values?.filter(
          (item, index, array) =>
            array.findIndex(v => v.name.value.toLowerCase() === item.name.value.toLowerCase()) !==
            index,
        );
        for (const duplicate of duplicates || []) {
          const enumName = duplicate.name.value;
          context.report({
            node: duplicate.name,
            message: `Unexpected case-insensitive enum values duplicates for ${getNodeName(
              duplicate,
            )}`,
            suggest: [
              {
                desc: `Remove \`${enumName}\` enum value`,
                fix: fixer => fixer.remove(duplicate as any),
              },
            ],
          });
        }
      },
    };
  },
};
