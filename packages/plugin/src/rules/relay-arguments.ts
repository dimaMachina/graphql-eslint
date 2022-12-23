import { FieldDefinitionNode, isScalarType, Kind, NameNode } from 'graphql';
import { GraphQLESLintRule } from '../types.js';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { requireGraphQLSchemaFromContext } from '../utils.js';
import { FromSchema } from 'json-schema-to-ts';

const RULE_ID = 'relay-arguments';
const MISSING_ARGUMENTS = 'MISSING_ARGUMENTS';

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      includeBoth: {
        type: 'boolean',
        default: true,
        description: 'Enforce including both forward and backward pagination arguments',
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions, true> = {
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
    schema,
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const { includeBoth = true } = context.options[0] || {};

    return {
      'FieldDefinition > .gqlType Name[value=/Connection$/]'(node: GraphQLESTreeNode<NameNode>) {
        let fieldNode = node.parent;
        while (fieldNode.kind !== Kind.FIELD_DEFINITION) {
          fieldNode = fieldNode.parent as GraphQLESTreeNode<FieldDefinitionNode>;
        }
        const args = Object.fromEntries(
          fieldNode.arguments.map(argument => [argument.name.value, argument]),
        );
        const hasForwardPagination = Boolean(args.first && args.after);
        const hasBackwardPagination = Boolean(args.last && args.before);

        if (!hasForwardPagination && !hasBackwardPagination) {
          context.report({
            node: fieldNode.name,
            messageId: MISSING_ARGUMENTS,
          });
          return;
        }

        function checkField(
          typeName: 'String' | 'Int',
          argumentName: 'first' | 'last' | 'after' | 'before',
        ): void {
          const argument = args[argumentName];
          const hasArgument = Boolean(argument);
          let type = argument as any;
          if (hasArgument && type.gqlType.kind === Kind.NON_NULL_TYPE) {
            type = type.gqlType;
          }
          const isAllowedNonNullType =
            hasArgument &&
            type.gqlType.kind === Kind.NAMED_TYPE &&
            (type.gqlType.name.value === typeName ||
              (typeName === 'String' && isScalarType(schema.getType(type.gqlType.name.value))));

          if (!isAllowedNonNullType) {
            const returnType = typeName === 'String' ? 'String or Scalar' : typeName;
            context.report({
              node: (argument || fieldNode).name,
              message: hasArgument
                ? `Argument \`${argumentName}\` must return ${returnType}.`
                : `Field \`${fieldNode.name.value}\` must contain an argument \`${argumentName}\`, that return ${returnType}.`,
            });
          }
        }

        if (includeBoth || args.first || args.after) {
          checkField('Int', 'first');
          checkField('String', 'after');
        }
        if (includeBoth || args.last || args.before) {
          checkField('Int', 'last');
          checkField('String', 'before');
        }
      },
    };
  },
};
