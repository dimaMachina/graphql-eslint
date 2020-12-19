import { Kind } from 'graphql';
import { GraphQLESLintRule } from '../types';

const formats = {
  camelCase: /^[a-z][^_]*$/g,
  PascalCase: /^[A-Z][^_]*$/g,
  snake_case: /^[a-z_]*$/g,
  UPPER_CASE: /^[A-Z_]*$/g,
};

function checkNameFormat(value, style, leadingUnderscore, trailingUnderscore) {
  let name = value;
  if (leadingUnderscore === 'allow') {
    [, name] = name.match(/^_*(.*)$/);
  }
  if (trailingUnderscore === 'allow') {
    name = name.replace(/_*$/, '');
  }
  return new RegExp(formats[style]).test(name);
}

const schemaOption = {
  type: 'string',
  enum: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
};

type ValidNaming = 'camelCase' | 'PascalCase' | 'snake_case' | 'UPPER_CASE';

type NamingConventionRuleConfig = [
  {
    leadingUnderscore?: 'allow' | 'forbid';
    trailingUnderscore?: 'allow' | 'forbid';
    [Kind.FIELD_DEFINITION]?: ValidNaming;
    [Kind.ENUM_VALUE_DEFINITION]?: ValidNaming;
    [Kind.INPUT_VALUE_DEFINITION]?: ValidNaming;
    [Kind.OBJECT_TYPE_DEFINITION]?: ValidNaming;
    [Kind.INTERFACE_TYPE_DEFINITION]?: ValidNaming;
    [Kind.ENUM_TYPE_DEFINITION]?: ValidNaming;
    [Kind.UNION_TYPE_DEFINITION]?: ValidNaming;
    [Kind.SCALAR_TYPE_DEFINITION]?: ValidNaming;
    [Kind.OPERATION_DEFINITION]?: ValidNaming;
    [Kind.FRAGMENT_DEFINITION]?: ValidNaming;
    [Kind.INPUT_OBJECT_TYPE_DEFINITION]?: ValidNaming;
  }
];

const rule: GraphQLESLintRule<NamingConventionRuleConfig> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Requires description around GraphQL nodes',
      category: 'Best practices',
      recommended: true,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/naming-convention.md',
      requiresSchema: false,
      requiresSiblings: false,
      examples: [
        {
          title: 'Incorrect',
          usage: [{ ObjectTypeDefinition: 'PascalCase' }],
          code: /* GraphQL */ `
            type someTypeName {
              f: String!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ FieldDefinition: 'camelCase', ObjectTypeDefinition: 'PascalCase' }],
          code: /* GraphQL */ `
            type SomeTypeName {
              someFieldName: String
            }
          `,
        },
      ],
    },
    schema: [
      {
        type: 'object',
        properties: {
          [Kind.FIELD_DEFINITION]: schemaOption,
          [Kind.INPUT_OBJECT_TYPE_DEFINITION]: schemaOption,
          [Kind.ENUM_VALUE_DEFINITION]: schemaOption,
          [Kind.INPUT_VALUE_DEFINITION]: schemaOption,
          [Kind.OBJECT_TYPE_DEFINITION]: schemaOption,
          [Kind.INTERFACE_TYPE_DEFINITION]: schemaOption,
          [Kind.ENUM_TYPE_DEFINITION]: schemaOption,
          [Kind.UNION_TYPE_DEFINITION]: schemaOption,
          [Kind.SCALAR_TYPE_DEFINITION]: schemaOption,
          [Kind.OPERATION_DEFINITION]: schemaOption,
          [Kind.FRAGMENT_DEFINITION]: schemaOption,
          leadingUnderscore: {
            type: 'string',
            enum: ['allow', 'forbid'],
            default: 'forbid',
          },
          trailingUnderscore: {
            type: 'string',
            enum: ['allow', 'forbid'],
            default: 'forbid',
          },
        },
      },
    ],
  },
  create(context) {
    const options: NamingConventionRuleConfig[number] = {
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      ...(context.options[0] || {}),
    };

    const checkNode = (node, style, nodeType) => {
      if (!checkNameFormat(node.value, style, options.leadingUnderscore, options.trailingUnderscore)) {
        context.report({
          node,
          message: '{{nodeType}} name "{{nodeName}}" should be in {{format}} format',
          data: {
            format: style,
            nodeType,
            nodeName: node.value,
          },
        });
      }
    };

    return {
      Name: node => {
        if (node.value.startsWith('_') && options.leadingUnderscore === 'forbid') {
          context.report({
            node,
            message: 'Leading underscores are not allowed',
          });
        }
        if (node.value.endsWith('_') && options.trailingUnderscore === 'forbid') {
          context.report({ node, message: 'Trailing underscores are not allowed' });
        }
      },
      ObjectTypeDefinition: node => {
        if (options.ObjectTypeDefinition) {
          checkNode(node.name, options.ObjectTypeDefinition, 'Type');
        }
      },
      InterfaceTypeDefinition: node => {
        if (options.InterfaceTypeDefinition) {
          checkNode(node.name, options.InterfaceTypeDefinition, 'Interface');
        }
      },
      EnumTypeDefinition: node => {
        if (options.EnumTypeDefinition) {
          checkNode(node.name, options.EnumTypeDefinition, 'Enumerator');
        }
      },
      InputObjectTypeDefinition: node => {
        if (options.InputObjectTypeDefinition) {
          checkNode(node.name, options.InputObjectTypeDefinition, 'Input type');
        }
      },
      FieldDefinition: node => {
        if (options.FieldDefinition) {
          checkNode(node.name, options.FieldDefinition, 'Field');
        }
      },
      EnumValueDefinition: node => {
        if (options.EnumValueDefinition) {
          checkNode(node.name, options.EnumValueDefinition, 'Enumeration value');
        }
      },
      InputValueDefinition: node => {
        if (options.InputValueDefinition) {
          checkNode(node.name, options.InputValueDefinition, 'Input property');
        }
      },
      FragmentDefinition: node => {
        if (options.FragmentDefinition) {
          checkNode(node.name, options.FragmentDefinition, 'Fragment');
        }
      },
      ScalarTypeDefinition: node => {
        if (options.ScalarTypeDefinition) {
          checkNode(node.name, options.ScalarTypeDefinition, 'Scalar');
        }
      },
      UnionTypeDefinition: node => {
        if (options.UnionTypeDefinition) {
          checkNode(node.name, options.UnionTypeDefinition, 'Scalar');
        }
      },
    };
  },
};

export default rule;
