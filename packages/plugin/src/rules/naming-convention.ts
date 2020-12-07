import { Kind } from 'graphql';
import { GraphQLESLintRule } from '../types';

const formats = {
  camelCase: /^[a-z][^_]*$/g,
  PascalCase: /^[A-Z][^_]*$/g,
  snake_case: /^[a-z_]*$/g,
  UPPER_CASE: /^[A-Z_]*$/g,
};

type ValidNaming = 'camelCase' | 'PascalCase' | 'snake_case' | 'UPPER_CASE';
const acceptedStyles: ValidNaming[] = ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'];
interface CheckNameFormatParams {
  value: string;
  style?: ValidNaming;
  leadingUnderscore: 'allow' | 'forbid';
  trailingUnderscore: 'allow' | 'forbid';
  suffix: string;
}
function checkNameFormat(params: CheckNameFormatParams): { ok: false; errorMessage: string } | { ok: true } {
  const { value, style, leadingUnderscore, trailingUnderscore, suffix } = params;
  let name = value;
  if (leadingUnderscore === 'allow') {
    [, name] = name.match(/^_*(.*)$/);
  }
  if (trailingUnderscore === 'allow') {
    name = name.replace(/_*$/, '');
  }
  if (suffix && !name.endsWith(suffix)) {
    return { ok: false, errorMessage: '{{nodeType}} name "{{nodeName}}" should have "{{suffix}}" suffix' };
  }
  if (style && !acceptedStyles.some(acceptedStyle => acceptedStyle === style)) {
    return {
      ok: false,
      errorMessage: `{{nodeType}} name "{{nodeName}}" should be in one of the following options: ${acceptedStyles.join(
        ','
      )}`,
    };
  }
  if (!formats[style]) {
    return { ok: true };
  }
  const ok = new RegExp(formats[style]).test(name);
  if (ok) {
    return { ok: true };
  }
  return { ok: false, errorMessage: '{{nodeType}} name "{{nodeName}}" should be in {{format}} format' };
}

const schemaOption = {
  type: ['string', 'object'],
  properties: {
    style: {
      type: 'string',
      enum: acceptedStyles,
    },
    suffix: {
      type: 'string',
    },
  },
};

interface PropertySchema {
  style?: ValidNaming;
  suffix?: string;
}

type NamingConventionRuleConfig = [
  {
    leadingUnderscore?: 'allow' | 'forbid';
    trailingUnderscore?: 'allow' | 'forbid';
    [Kind.FIELD_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.ENUM_VALUE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.INPUT_VALUE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.OBJECT_TYPE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.INTERFACE_TYPE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.ENUM_TYPE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.UNION_TYPE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.SCALAR_TYPE_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.OPERATION_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.FRAGMENT_DEFINITION]?: ValidNaming | PropertySchema;
    [Kind.INPUT_OBJECT_TYPE_DEFINITION]?: ValidNaming | PropertySchema;
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

    const checkNode = (node, style, nodeType, suffix = '') => {
      const result = checkNameFormat({
        value: node.value,
        style,
        leadingUnderscore: options.leadingUnderscore,
        trailingUnderscore: options.trailingUnderscore,
        suffix: suffix,
      });
      if (result.ok === false) {
        context.report({
          node,
          message: result.errorMessage,
          data: {
            suffix: suffix,
            format: style,
            nodeType,
            nodeName: node.value,
          },
        });
      }
    };

    const convertToFinalPropertySchema = (value: ValidNaming | PropertySchema): PropertySchema => {
      if (typeof value === 'object') {
        return value;
      }
      return {
        style: value,
        suffix: '',
      };
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
          const property = convertToFinalPropertySchema(options.ObjectTypeDefinition);
          checkNode(node.name, property.style, 'Type', property.suffix);
        }
      },
      InterfaceTypeDefinition: node => {
        if (options.InterfaceTypeDefinition) {
          const property = convertToFinalPropertySchema(options.InterfaceTypeDefinition);
          checkNode(node.name, property.style, 'Interface', property.suffix);
        }
      },
      EnumTypeDefinition: node => {
        if (options.EnumTypeDefinition) {
          const property = convertToFinalPropertySchema(options.EnumTypeDefinition);
          checkNode(node.name, property.style, 'Enumerator', property.suffix);
        }
      },
      InputObjectTypeDefinition: node => {
        if (options.InputObjectTypeDefinition) {
          const property = convertToFinalPropertySchema(options.InputObjectTypeDefinition);
          checkNode(node.name, property.style, 'Input type', property.suffix);
        }
      },
      FieldDefinition: node => {
        if (options.FieldDefinition) {
          const property = convertToFinalPropertySchema(options.FieldDefinition);
          checkNode(node.name, property.style, 'Field', property.suffix);
        }
      },
      EnumValueDefinition: node => {
        if (options.EnumValueDefinition) {
          const property = convertToFinalPropertySchema(options.EnumValueDefinition);
          checkNode(node.name, property.style, 'Enumeration value', property.suffix);
        }
      },
      InputValueDefinition: node => {
        if (options.InputValueDefinition) {
          const property = convertToFinalPropertySchema(options.InputValueDefinition);
          checkNode(node.name, property.style, 'Input property', property.suffix);
        }
      },
      FragmentDefinition: node => {
        if (options.FragmentDefinition) {
          const property = convertToFinalPropertySchema(options.FragmentDefinition);
          checkNode(node.name, property.style, 'Fragment', property.suffix);
        }
      },
      ScalarTypeDefinition: node => {
        if (options.ScalarTypeDefinition) {
          const property = convertToFinalPropertySchema(options.ScalarTypeDefinition);
          checkNode(node.name, property.style, 'Scalar', property.suffix);
        }
      },
      UnionTypeDefinition: node => {
        if (options.UnionTypeDefinition) {
          const property = convertToFinalPropertySchema(options.UnionTypeDefinition);
          checkNode(node.name, property.style, 'Scalar', property.suffix);
        }
      },
    };
  },
};

export default rule;
