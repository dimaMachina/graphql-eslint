import { FieldDefinitionNode, InputValueDefinitionNode, isScalarType, Kind, NameNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';
import { requireGraphQLSchemaFromContext } from '../utils';

const RULE_ID = 'relay-arguments';
const MISSING_ARGUMENTS = 'MISSING_ARGUMENTS';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Set of rules to follow Relay specification for Arguments.',
        '',
        '- A field that returns a Connection type must include forward pagination arguments (`first` and `after`), backward pagination arguments (`last` and `before`), or both',
        '',
        'Forward pagination arguments',
        '',
        '- `first` takes a non-negative integer',
        '- `after` takes the Cursor type',
        '',
        'Backward pagination arguments',
        '',
        '- `last` takes a non-negative integer',
        '- `before` takes the Cursor type',
      ].join('\n'),
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              posts: PostConnection
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              posts(after: String, first: Int, before: String, last: Int): PostConnection
            }
          `,
        },
      ],
      isDisabledForAllConfig: true,
    },
    messages: {
      [MISSING_ARGUMENTS]:
        'A field that returns a Connection type must include forward pagination arguments (`first` and `after`), backward pagination arguments (`last` and `before`), or both.',
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);

    return {
      'FieldDefinition > .gqlType Name[value=/Connection$/]'(node: GraphQLESTreeNode<NameNode>) {
        let fieldNode = node.parent;
        while (fieldNode.kind !== Kind.FIELD_DEFINITION) {
          fieldNode = fieldNode.parent as GraphQLESTreeNode<FieldDefinitionNode>;
        }
        const { first, after, last, before } = Object.fromEntries(
          fieldNode.arguments.map(argument => [argument.name.value, argument])
        );
        const hasForwardPagination = Boolean(first && after);
        const hasBackwardPagination = Boolean(last && before);

        if (!hasForwardPagination && !hasBackwardPagination) {
          context.report({
            node: fieldNode.name,
            messageId: MISSING_ARGUMENTS,
          });
          return;
        }

        function checkField(typeName: 'String' | 'Int', argument?: GraphQLESTreeNode<InputValueDefinitionNode>) {
          let type = argument as any;
          if (type && type.kind === Kind.NON_NULL_TYPE) {
            type = type.gqlType;
          }
          const isAllowedNonNullType =
            Boolean(type) &&
            type.gqlType.kind === Kind.NAMED_TYPE &&
            (type.gqlType.name.value === typeName ||
              (typeName === 'String' && isScalarType(schema.getType(type.gqlType.name.value))));

          if (!isAllowedNonNullType) {
            const argumentName = argument.name.value;
            context.report({
              node: argument.name,
              message: `Argument \`${argumentName}\` must return non-null ${
                typeName === 'String' ? 'String or Scalar' : typeName
              }.`,
            });
          }
        }

        checkField('Int', first);
        checkField('Int', last);
        checkField('String', after);
        checkField('String', before);
      },
    };
  },
};

export default rule;
