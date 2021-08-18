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
  forbiddenPrefixes: string[];
  forbiddenSuffixes: string[];
}
function checkNameFormat(params: CheckNameFormatParams): { ok: false; errorMessage: string } | { ok: true } {
  const {
    value,
    style,
    leadingUnderscore,
    trailingUnderscore,
    suffix,
    prefix,
    forbiddenPrefixes,
    forbiddenSuffixes,
  } = params;
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
  if (style && !acceptedStyles.includes(style)) {
    return {
      ok: false,
      errorMessage: `{{nodeType}} name "{{nodeName}}" should be in one of the following options: ${acceptedStyles.join(
        ','
      )}`,
    };
  }
  if (forbiddenPrefixes.some(forbiddenPrefix => name.startsWith(forbiddenPrefix))) {
    return {
      ok: false,
      errorMessage:
        '{{nodeType}} "{{nodeName}}" should not have one of the following prefix(es): {{forbiddenPrefixes}}',
    };
  }

  if (forbiddenSuffixes.some(forbiddenSuffix => name.endsWith(forbiddenSuffix))) {
    return {
      ok: false,
      errorMessage:
        '{{nodeType}} "{{nodeName}}" should not have one of the following suffix(es): {{forbiddenSuffixes}}',
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

export interface PropertySchema {
  style?: ValidNaming;
  suffix?: string;
  prefix?: string;
  forbiddenPrefixes?: string[];
  forbiddenSuffixes?: string[];
}

type NamingConventionRuleConfig = [
  {
    leadingUnderscore?: 'allow' | 'forbid';
    trailingUnderscore?: 'allow' | 'forbid';
    QueryDefinition?: ValidNaming | PropertySchema;
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
      description: 'Require names to follow specified conventions.',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/naming-convention.md',
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
            forbiddenPrefixes: {
              additionalItems: false,
              type: 'array',
              minItems: 1,
              items: {
                type: 'string',
              },
            },
            forbiddenSuffixes: {
              additionalItems: false,
              type: 'array',
              minItems: 1,
              items: {
                type: 'string',
              },
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
          QueryDefinition: schemaOption,
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

    const checkNode = (node, property: PropertySchema, nodeType: string) => {
      const { style, suffix = '', prefix = '', forbiddenPrefixes = [], forbiddenSuffixes = [] } = property;
      const result = checkNameFormat({
        value: node.value,
        style,
        leadingUnderscore: options.leadingUnderscore,
        trailingUnderscore: options.trailingUnderscore,
        prefix: prefix,
        suffix: suffix,
        forbiddenPrefixes: forbiddenPrefixes,
        forbiddenSuffixes: forbiddenSuffixes,
      });
      if (result.ok === false) {
        context.report({
          node,
          message: result.errorMessage,
          data: {
            prefix: prefix,
            suffix: suffix,
            format: style,
            forbiddenPrefixes: forbiddenPrefixes.join(', '),
            forbiddenSuffixes: forbiddenSuffixes.join(', '),
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

    const isQueryType = (node): boolean => {
      return (
        (node.type === 'ObjectTypeDefinition' || node.type === 'ObjectTypeExtension') && node.name.value === 'Query'
      );
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
          checkNode(node.name, property, 'Type');
        }
      },
      InterfaceTypeDefinition: node => {
        if (options.InterfaceTypeDefinition) {
          const property = normalisePropertyOption(options.InterfaceTypeDefinition);
          checkNode(node.name, property, 'Interface');
        }
      },
      EnumTypeDefinition: node => {
        if (options.EnumTypeDefinition) {
          const property = normalisePropertyOption(options.EnumTypeDefinition);
          checkNode(node.name, property, 'Enumerator');
        }
      },
      InputObjectTypeDefinition: node => {
        if (options.InputObjectTypeDefinition) {
          const property = normalisePropertyOption(options.InputObjectTypeDefinition);
          checkNode(node.name, property, 'Input type');
        }
      },
      FieldDefinition: (node: any) => {
        if (options.QueryDefinition && isQueryType(node.parent)) {
          const property = normalisePropertyOption(options.QueryDefinition);
          checkNode(node.name, property, 'Query');
        }

        if (options.FieldDefinition && !isQueryType(node.parent)) {
          const property = normalisePropertyOption(options.FieldDefinition);
          checkNode(node.name, property, 'Field');
        }
      },
      EnumValueDefinition: node => {
        if (options.EnumValueDefinition) {
          const property = normalisePropertyOption(options.EnumValueDefinition);
          checkNode(node.name, property, 'Enumeration value');
        }
      },
      InputValueDefinition: node => {
        if (options.InputValueDefinition) {
          const property = normalisePropertyOption(options.InputValueDefinition);
          checkNode(node.name, property, 'Input property');
        }
      },
      OperationDefinition: node => {
        if (options.OperationDefinition) {
          const property = normalisePropertyOption(options.OperationDefinition);
          if (node.name) {
            checkNode(node.name, property, 'Operation');
          }
        }
      },
      FragmentDefinition: node => {
        if (options.FragmentDefinition) {
          const property = normalisePropertyOption(options.FragmentDefinition);
          checkNode(node.name, property, 'Fragment');
        }
      },
      ScalarTypeDefinition: node => {
        if (options.ScalarTypeDefinition) {
          const property = normalisePropertyOption(options.ScalarTypeDefinition);
          checkNode(node.name, property, 'Scalar');
        }
      },
      UnionTypeDefinition: node => {
        if (options.UnionTypeDefinition) {
          const property = normalisePropertyOption(options.UnionTypeDefinition);
          checkNode(node.name, property, 'Union');
        }
      },
    };
  },
};

export default rule;
