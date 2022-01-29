import { EnumTypeDefinitionNode, EnumTypeExtensionNode, Kind } from 'graphql';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRule } from '../types';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-case-insensitive-enum-values-duplicates.md`,
      category: 'Schema',
      recommended: true,
      description: 'Disallow case-insensitive enum values duplicates.',
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
        const duplicates = node.values.filter(
          (item, index, array) =>
            array.findIndex(v => v.name.value.toLowerCase() === item.name.value.toLowerCase()) !== index
        );
        for (const duplicate of duplicates) {
          const enumName = duplicate.name.value;
          context.report({
            node: duplicate.name,
            message: `Case-insensitive enum values duplicates are not allowed! Found: "${enumName}"`,
          });
        }
      },
    };
  },
};

export default rule;
