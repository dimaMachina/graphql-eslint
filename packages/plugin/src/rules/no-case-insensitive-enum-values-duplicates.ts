import { GraphQLESLintRule } from '../types';

const ERROR_MESSAGE_ID = 'NO_CASE_INSENSITIVE_ENUM_VALUES_DUPLICATES';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      url:
        'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-case-insensitive-enum-values-duplicates.md',
      category: 'Best Practices',
      recommended: true,
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
    fixable: 'code',
    messages: {
      [ERROR_MESSAGE_ID]: `Case-insensitive enum values duplicates are not allowed! Found: "{{ found }}"`,
    },
  },
  create(context) {
    return {
      EnumTypeDefinition(node) {
        const foundDuplicates = node.values.filter(
          (item, index) =>
            node.values.findIndex(v => v.name.value.toLowerCase() === item.name.value.toLowerCase()) !== index
        );

        for (const dup of foundDuplicates) {
          context.report({
            node: dup.name,
            data: {
              found: dup.name.value,
            },
            messageId: ERROR_MESSAGE_ID,
          });
        }
      },
    };
  },
};

export default rule;
