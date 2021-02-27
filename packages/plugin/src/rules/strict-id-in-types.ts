import { ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRule } from '../types';

interface ExceptionRule {
  suffixes?: string[];
}

type StrictIdInTypesRuleConfig = [
  {
    acceptedIdNames?: string[];
    acceptedIdTypes?: string[];
    exceptions?: ExceptionRule;
  }
];

interface ShouldIgnoreNodeParams {
  node: GraphQLESTreeNode<ObjectTypeDefinitionNode>;
  exceptions: ExceptionRule;
}
const shouldIgnoreNode = ({ node, exceptions }: ShouldIgnoreNodeParams): boolean => {
  const rawNode = node.rawNode();

  if (exceptions.suffixes && exceptions.suffixes.some(suffix => rawNode.name.value.endsWith(suffix))) {
    return true;
  }

  return false;
};

const rule: GraphQLESLintRule<StrictIdInTypesRuleConfig> = {
  create(context) {
    const options: StrictIdInTypesRuleConfig[number] = {
      acceptedIdNames: ['id'],
      acceptedIdTypes: ['ID'],
      exceptions: {},
      ...(context.options[0] || {}),
    };

    return {
      ObjectTypeDefinition(node) {
        if (shouldIgnoreNode({ node, exceptions: options.exceptions })) {
          return;
        }

        const validIds = node.fields.filter(field => {
          const fieldNode = field.rawNode();

          const isValidIdName = options.acceptedIdNames.includes(fieldNode.name.value);

          // To be a valid type, it must be non-null and one of the accepted types.
          let isValidIdType = false;
          if (fieldNode.type.kind === 'NonNullType' && fieldNode.type.type.kind === 'NamedType') {
            isValidIdType = options.acceptedIdTypes.includes(fieldNode.type.type.name.value);
          }

          return isValidIdName && isValidIdType;
        });

        if (validIds.length !== 1) {
          context.report({
            node,
            message:
              '{{nodeName}} must have exactly one non-nullable unique identifier. Accepted name(s): {{acceptedNamesString}} ; Accepted type(s): {{acceptedTypesString}}',
            data: {
              nodeName: node.name.value,
              acceptedNamesString: options.acceptedIdNames.join(','),
              acceptedTypesString: options.acceptedIdTypes.join(','),
            },
          });
        }
      },
    };
  },
};

export default rule;
