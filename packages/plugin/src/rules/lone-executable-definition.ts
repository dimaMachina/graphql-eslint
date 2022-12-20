import { GraphQLESLintRule } from '../types';
import { OperationDefinitionNode, FragmentDefinitionNode, Kind } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter';
import { ARRAY_DEFAULT_OPTIONS } from '../utils';

const RULE_ID = 'lone-executable-definition';
const definitionsEnum = [
  'query' as const,
  'fragment' as const,
  'mutation' as const,
  'subscription' as const,
];

export interface LoneExecutableDefinitionConfig {
  ignore?: typeof definitionsEnum[number][];
}

type DefinitionESTreeNode =
  | GraphQLESTreeNode<OperationDefinitionNode>
  | GraphQLESTreeNode<FragmentDefinitionNode>;

const uppercaseFirst = (string: string) => string.slice(0, 1).toUpperCase() + string.slice(1);

const isDefinitionNode = (node: { kind: string }): node is DefinitionESTreeNode =>
  node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;

const rule: GraphQLESLintRule<[LoneExecutableDefinitionConfig]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description:
        'Require all queries, mutations, subscriptions and fragments to be located in separate files.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query Foo {
              id
            }
            fragment Bar on Baz {
              id
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            query Foo {
              id
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: '{{name}} should be in a separate file.',
    },
    schema: {
      type: 'array',
      minItems: 0,
      maxItems: 1,
      items: {
        type: 'object',
        minProperties: 1,
        properties: {
          ignores: {
            ...ARRAY_DEFAULT_OPTIONS,
            items: {
              enum: definitionsEnum,
            },
            description: 'Allow certain definitions to be placed alongside others.',
          },
        },
      },
    },
  },
  create(context) {
    const ignore = new Set(context.options[0]?.ignore ?? []);

    return {
      Document(node) {
        const definitions = node.definitions
          .slice(1) // ignore first definition
          .filter(isDefinitionNode)
          .map(node => ({
            node,
            type: 'operation' in node ? node.operation : ('fragment' as const),
          }))
          .filter(({ type }) => !ignore.has(type));

        for (const { node, type } of definitions) {
          const typeName = uppercaseFirst(type);
          const definitionName = node.name?.value;
          const name = definitionName ? `${typeName} "${definitionName}"` : typeName;

          context.report({
            node,
            messageId: RULE_ID,
            data: {
              name,
            },
          });
        }
      },
    };
  },
};

export default rule;
