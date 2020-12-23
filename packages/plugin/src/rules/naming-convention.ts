import { Kind } from 'graphql';
import { GraphQLESLintRule } from '../types';

const formats = {
  camelCase: /^[a-z][^_]*$/g,
  PascalCase: /^[A-Z][^_]*$/g,
  snake_case: /^[a-z_][a-z0-9_]*$/g,
  UPPER_CASE: /^[A-Z_][A-Z0-9_]*$/g,
};

const acceptedStyles: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'] = [
  'camelCase',
  'PascalCase',
  'snake_case',
  'UPPER_CASE',
];
type ValidNaming = typeof acceptedStyles[number];
interface CheckNameFormatParams {
  value: string;
  style?: ValidNaming;
  leadingUnderscore: 'allow' | 'forbid';
  trailingUnderscore: 'allow' | 'forbid';
  prefix: string;
  suffix: string;
}
function checkNameFormat(params: CheckNameFormatParams): { ok: false; errorMessage: string } | { ok: true } {
  const { value, style, leadingUnderscore, trailingUnderscore, suffix, prefix } = params;
  let name = value;
  if (leadingUnderscore === 'allow') {
    [, name] = name.match(/^_*(.*)$/);
  }
  if (trailingUnderscore === 'allow') {
    name = name.replace(/_*$/, '');
  }
  if (prefix && !name.startsWith(prefix)) {
    return { ok: false, errorMessage: '{{nodeType}} name "{{nodeName}}" should have "{{prefix}}" prefix' };
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
  oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asObject' }],
};

interface PropertySchema {
  style?: ValidNaming;
  suffix?: string;
  prefix?: string;
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
    schema: {
      definitions: {
        asString: {
          type: 'string',
          description: `One of: ${acceptedStyles.map(t => `\`${t}\``).join(', ')}`,
          enum: acceptedStyles,
        },
        asObject: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: acceptedStyles,
            },
            prefix: {
              type: 'string',
            },
            suffix: {
              type: 'string',
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          [Kind.FIELD_DEFINITION as string]: schemaOption,
          [Kind.INPUT_OBJECT_TYPE_DEFINITION as string]: schemaOption,
          [Kind.ENUM_VALUE_DEFINITION as string]: schemaOption,
          [Kind.INPUT_VALUE_DEFINITION as string]: schemaOption,
          [Kind.OBJECT_TYPE_DEFINITION as string]: schemaOption,
          [Kind.INTERFACE_TYPE_DEFINITION as string]: schemaOption,
          [Kind.ENUM_TYPE_DEFINITION as string]: schemaOption,
          [Kind.UNION_TYPE_DEFINITION as string]: schemaOption,
          [Kind.SCALAR_TYPE_DEFINITION as string]: schemaOption,
          [Kind.OPERATION_DEFINITION as string]: schemaOption,
          [Kind.FRAGMENT_DEFINITION as string]: schemaOption,
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
    },
  },
  create(context) {
    const options: NamingConventionRuleConfig[number] = {
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      ...(context.options[0] || {}),
    };

    const checkNode = (node, style, nodeType, suffix = '', prefix = '') => {
      const result = checkNameFormat({
        value: node.value,
        style,
        leadingUnderscore: options.leadingUnderscore,
        trailingUnderscore: options.trailingUnderscore,
        prefix: prefix,
        suffix: suffix,
      });
      if (result.ok === false) {
        context.report({
          node,
          message: result.errorMessage,
          data: {
            prefix: prefix,
            suffix: suffix,
            format: style,
            nodeType,
            nodeName: node.value,
          },
        });
      }
    };

    const normalisePropertyOption = (value: ValidNaming | PropertySchema): PropertySchema => {
      if (typeof value === 'object') {
        return value;
      }
      return {
        style: value,
        prefix: '',
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
          const property = normalisePropertyOption(options.ObjectTypeDefinition);
          checkNode(node.name, property.style, 'Type', property.suffix, property.prefix);
        }
      },
      InterfaceTypeDefinition: node => {
        if (options.InterfaceTypeDefinition) {
          const property = normalisePropertyOption(options.InterfaceTypeDefinition);
          checkNode(node.name, property.style, 'Interface', property.suffix, property.prefix);
        }
      },
      EnumTypeDefinition: node => {
        if (options.EnumTypeDefinition) {
          const property = normalisePropertyOption(options.EnumTypeDefinition);
          checkNode(node.name, property.style, 'Enumerator', property.suffix, property.prefix);
        }
      },
      InputObjectTypeDefinition: node => {
        if (options.InputObjectTypeDefinition) {
          const property = normalisePropertyOption(options.InputObjectTypeDefinition);
          checkNode(node.name, property.style, 'Input type', property.suffix, property.prefix);
        }
      },
      FieldDefinition: node => {
        if (options.FieldDefinition) {
          const property = normalisePropertyOption(options.FieldDefinition);
          checkNode(node.name, property.style, 'Field', property.suffix, property.prefix);
        }
      },
      EnumValueDefinition: node => {
        if (options.EnumValueDefinition) {
          const property = normalisePropertyOption(options.EnumValueDefinition);
          checkNode(node.name, property.style, 'Enumeration value', property.suffix, property.prefix);
        }
      },
      InputValueDefinition: node => {
        if (options.InputValueDefinition) {
          const property = normalisePropertyOption(options.InputValueDefinition);
          checkNode(node.name, property.style, 'Input property', property.suffix, property.prefix);
        }
      },
      FragmentDefinition: node => {
        if (options.FragmentDefinition) {
          const property = normalisePropertyOption(options.FragmentDefinition);
          checkNode(node.name, property.style, 'Fragment', property.suffix, property.prefix);
        }
      },
      ScalarTypeDefinition: node => {
        if (options.ScalarTypeDefinition) {
          const property = normalisePropertyOption(options.ScalarTypeDefinition);
          checkNode(node.name, property.style, 'Scalar', property.suffix, property.prefix);
        }
      },
      UnionTypeDefinition: node => {
        if (options.UnionTypeDefinition) {
          const property = normalisePropertyOption(options.UnionTypeDefinition);
          checkNode(node.name, property.style, 'Scalar', property.suffix, property.prefix);
        }
      },
    };
  },
};

export default rule;
