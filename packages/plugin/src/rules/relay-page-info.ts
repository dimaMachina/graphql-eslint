import { isScalarType, Kind, NameNode, ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { REPORT_ON_FIRST_CHARACTER, requireGraphQLSchemaFromContext } from '../utils.js';
import { NON_OBJECT_TYPES } from './relay-connection-types.js';

const RULE_ID = 'relay-page-info';
const MESSAGE_MUST_EXIST = 'MESSAGE_MUST_EXIST';
const MESSAGE_MUST_BE_OBJECT_TYPE = 'MESSAGE_MUST_BE_OBJECT_TYPE';
const notPageInfoTypesSelector =
  `:matches(${NON_OBJECT_TYPES})[name.value=PageInfo] > .name` as const;

let hasPageInfoChecked = false;

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Set of rules to follow Relay specification for `PageInfo` object.',
        '',
        '- `PageInfo` must be an Object type',
        '- `PageInfo` must contain fields `hasPreviousPage` and `hasNextPage`, that return non-null Boolean',
        '- `PageInfo` must contain fields `startCursor` and `endCursor`, that return either String or Scalar, which can be null if there are no results',
      ].join('\n'),
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      examples: [
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type PageInfo {
              hasPreviousPage: Boolean!
              hasNextPage: Boolean!
              startCursor: String
              endCursor: String
            }
          `,
        },
      ],
      isDisabledForAllConfig: true,
      requiresSchema: true,
    },
    messages: {
      [MESSAGE_MUST_EXIST]: 'The server must provide a `PageInfo` object.',
      [MESSAGE_MUST_BE_OBJECT_TYPE]: '`PageInfo` must be an Object type.',
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    if (!schema) return {}
    if (process.env.NODE_ENV === 'test' || !hasPageInfoChecked) {
      const pageInfoType = schema.getType('PageInfo');
      if (!pageInfoType) {
        context.report({
          loc: REPORT_ON_FIRST_CHARACTER,
          messageId: MESSAGE_MUST_EXIST,
        });
      }
      hasPageInfoChecked = true;
    }
    return {
      [notPageInfoTypesSelector](node: GraphQLESTreeNode<NameNode>) {
        context.report({ node, messageId: MESSAGE_MUST_BE_OBJECT_TYPE });
      },
      'ObjectTypeDefinition[name.value=PageInfo]'(
        node: GraphQLESTreeNode<ObjectTypeDefinitionNode>,
      ) {
        const fieldMap = Object.fromEntries(
          node.fields?.map(field => [field.name.value, field]) || [],
        );

        const checkField = (
          fieldName: 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor',
          typeName: 'Boolean' | 'String',
        ): void => {
          const field = fieldMap[fieldName];
          let isAllowedType = false;

          if (field) {
            const type = field.gqlType;
            if (typeName === 'Boolean') {
              isAllowedType =
                type.kind === Kind.NON_NULL_TYPE &&
                type.gqlType.kind === Kind.NAMED_TYPE &&
                type.gqlType.name.value === 'Boolean';
            } else if (type.kind === Kind.NAMED_TYPE) {
              isAllowedType =
                type.name.value === 'String' || isScalarType(schema.getType(type.name.value));
            }
          }

          if (!isAllowedType) {
            const returnType =
              typeName === 'Boolean'
                ? 'non-null Boolean'
                : 'either String or Scalar, which can be null if there are no results';
            context.report({
              node: field ? field.name : node.name,
              message: field
                ? `Field \`${fieldName}\` must return ${returnType}.`
                : `\`PageInfo\` must contain a field \`${fieldName}\`, that return ${returnType}.`,
            });
          }
        };
        checkField('hasPreviousPage', 'Boolean');
        checkField('hasNextPage', 'Boolean');
        checkField('startCursor', 'String');
        checkField('endCursor', 'String');
      },
    };
  },
};
