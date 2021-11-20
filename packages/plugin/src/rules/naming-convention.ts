import { ASTKindToNode, Kind, NameNode } from 'graphql';
import { GraphQLESLintRule, ValueOf } from '../types';
import { TYPES_KINDS, getLocation } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRuleListener } from '../testkit';

const FIELDS_KINDS = [Kind.FIELD_DEFINITION, Kind.INPUT_VALUE_DEFINITION, Kind.ARGUMENT, Kind.DIRECTIVE_DEFINITION];

const KindToDisplayName = {
  // types
  [Kind.OBJECT_TYPE_DEFINITION]: 'Type',
  [Kind.INTERFACE_TYPE_DEFINITION]: 'Interface',
  [Kind.ENUM_TYPE_DEFINITION]: 'Enumerator',
  [Kind.SCALAR_TYPE_DEFINITION]: 'Scalar',
  [Kind.INPUT_OBJECT_TYPE_DEFINITION]: 'Input type',
  [Kind.UNION_TYPE_DEFINITION]: 'Union',
  // fields
  [Kind.FIELD_DEFINITION]: 'Field',
  [Kind.INPUT_VALUE_DEFINITION]: 'Input property',
  [Kind.ARGUMENT]: 'Argument',
  [Kind.DIRECTIVE_DEFINITION]: 'Directive',
  // rest
  [Kind.ENUM_VALUE_DEFINITION]: 'Enumeration value',
  [Kind.OPERATION_DEFINITION]: 'Operation',
  [Kind.FRAGMENT_DEFINITION]: 'Fragment',
  [Kind.VARIABLE_DEFINITION]: 'Variable',
};

type AllowedKind = keyof typeof KindToDisplayName;
type AllowedStyle = 'camelCase' | 'PascalCase' | 'snake_case' | 'UPPER_CASE';

const StyleToRegex: Record<AllowedStyle, RegExp> = {
  camelCase: /^[a-z][\dA-Za-z]*$/,
  PascalCase: /^[A-Z][\dA-Za-z]*$/,
  snake_case: /^[a-z][\d_a-z]*[\da-z]$/,
  UPPER_CASE: /^[A-Z][\dA-Z_]*[\dA-Z]$/,
};

const ALLOWED_KINDS = Object.keys(KindToDisplayName).sort() as AllowedKind[];
const ALLOWED_STYLES = Object.keys(StyleToRegex) as AllowedStyle[];

const schemaOption = {
  oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asObject' }],
};

type PropertySchema = {
  style?: AllowedStyle;
  suffix?: string;
  prefix?: string;
  forbiddenPrefixes?: string[];
  forbiddenSuffixes?: string[];
};

type Options = AllowedStyle | PropertySchema;

type NamingConventionRuleConfig = {
  allowLeadingUnderscore?: boolean;
  allowTrailingUnderscore?: boolean;
  types?: Options;
  fields?: Options;
} & {
  [key in `${AllowedKind}${string}`]?: Options;
};

type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

const rule: GraphQLESLintRule<[NamingConventionRuleConfig]> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require names to follow specified conventions.',
      category: ['Schema', 'Operations'],
      recommended: true,
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/naming-convention.md',
      examples: [
        {
          title: 'Incorrect',
          usage: [{ types: 'PascalCase', fields: 'camelCase' }],
          code: /* GraphQL */ `
            type user {
              first_name: String!
            }
          `,
        },
        {
          title: 'Incorrect',
          usage: [{ FragmentDefinition: { style: 'PascalCase', forbiddenSuffixes: ['Fragment'] } }],
          code: /* GraphQL */ `
            fragment UserFragment on User {
              # ...
            }
          `,
        },
        {
          title: 'Incorrect',
          usage: [{ 'FieldDefinition[parent.name.value=Query]': { forbiddenPrefixes: ['get'] } }],
          code: /* GraphQL */ `
            type Query {
              getUsers: [User!]!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ types: 'PascalCase', fields: 'camelCase' }],
          code: /* GraphQL */ `
            type User {
              firstName: String
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ FragmentDefinition: { style: 'PascalCase', forbiddenSuffixes: ['Fragment'] } }],
          code: /* GraphQL */ `
            fragment UserFields on User {
              # ...
            }
          `,
        },
        {
          title: 'Correct',
          usage: [{ 'FieldDefinition[parent.name.value=Query]': { forbiddenPrefixes: ['get'] } }],
          code: /* GraphQL */ `
            type Query {
              users: [User!]!
            }
          `,
        },
      ],
      configOptions: {
        schema: [
          {
            types: 'PascalCase',
            fields: 'camelCase',
            EnumValueDefinition: 'UPPER_CASE',
            'FieldDefinition[parent.name.value=Query]': {
              forbiddenPrefixes: ['query', 'get'],
              forbiddenSuffixes: ['Query'],
            },
            'FieldDefinition[parent.name.value=Mutation]': {
              forbiddenPrefixes: ['mutation'],
              forbiddenSuffixes: ['Mutation'],
            },
            'FieldDefinition[parent.name.value=Subscription]': {
              forbiddenPrefixes: ['subscription'],
              forbiddenSuffixes: ['Subscription'],
            },
          },
        ],
        operations: [
          {
            VariableDefinition: 'camelCase',
            OperationDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
              forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
            },
            FragmentDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Fragment'],
              forbiddenSuffixes: ['Fragment'],
            },
          },
        ],
      },
    },
    schema: {
      definitions: {
        asString: {
          enum: ALLOWED_STYLES,
          description: `One of: ${ALLOWED_STYLES.map(t => `\`${t}\``).join(', ')}`,
        },
        asObject: {
          type: 'object',
          additionalProperties: false,
          properties: {
            style: { enum: ALLOWED_STYLES },
            prefix: { type: 'string' },
            suffix: { type: 'string' },
            forbiddenPrefixes: {
              type: 'array',
              uniqueItems: true,
              minItems: 1,
              items: { type: 'string' },
            },
            forbiddenSuffixes: {
              type: 'array',
              uniqueItems: true,
              minItems: 1,
              items: { type: 'string' },
            },
          },
        },
      },
      type: 'array',
      maxItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          types: {
            ...schemaOption,
            description: `Includes:\n\n${TYPES_KINDS.map(kind => `- \`${kind}\``).join('\n')}`,
          },
          fields: {
            ...schemaOption,
            description: `Includes:\n\n${FIELDS_KINDS.map(kind => `- \`${kind}\``).join('\n')}`,
          },
          ...Object.fromEntries(
            ALLOWED_KINDS.map(kind => [
              kind,
              {
                ...schemaOption,
                description: `Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#${kind}).`,
              },
            ])
          ),
          allowLeadingUnderscore: {
            type: 'boolean',
            default: false,
          },
          allowTrailingUnderscore: {
            type: 'boolean',
            default: false,
          },
        },
        patternProperties: {
          [`^(${ALLOWED_KINDS.join('|')})(.+)?$`]: schemaOption,
        },
        description: [
          "> It's possible to use a [`selector`](https://eslint.org/docs/developer-guide/selectors) that starts with allowed `ASTNode` names which are described below.",
          '>',
          '> Paste or drop code into the editor in [ASTExplorer](https://astexplorer.net) and inspect the generated AST to compose your selector.',
          '>',
          '> Example: pattern property `FieldDefinition[parent.name.value=Query]` will match only fields for type `Query`.',
        ].join('\n'),
      },
    },
  },
  create(context) {
    const options = context.options[0] || {};

    const { allowLeadingUnderscore, allowTrailingUnderscore, types, fields, ...restOptions } = options;

    function normalisePropertyOption(kind: string): PropertySchema {
      let style: Options = options[kind];

      if (!style) {
        style = TYPES_KINDS.includes(kind as any) ? types : fields;
      }
      return typeof style === 'object' ? style : { style };
    }

    const checkNode = (selector: string) => (node: GraphQLESTreeNode<ValueOf<AllowedKindToNode>>) => {
      const { name } = node.kind === Kind.VARIABLE_DEFINITION ? node.variable : node;
      if (!name) {
        return;
      }
      const { prefix, suffix, forbiddenPrefixes, forbiddenSuffixes, style } = normalisePropertyOption(selector);
      const nodeType = KindToDisplayName[node.kind] || node.kind;
      const nodeName = name.value;
      const errorMessage = getErrorMessage();
      if (errorMessage) {
        context.report({
          loc: getLocation(name.loc, name.value),
          message: `${nodeType} "${nodeName}" should ${errorMessage}`,
        });
      }

      function getErrorMessage(): string | void {
        let name = nodeName;
        if (allowLeadingUnderscore) {
          name = name.replace(/^_*/, '');
        }
        if (allowTrailingUnderscore) {
          name = name.replace(/_*$/, '');
        }
        if (prefix && !name.startsWith(prefix)) {
          return `have "${prefix}" prefix`;
        }
        if (suffix && !name.endsWith(suffix)) {
          return `have "${suffix}" suffix`;
        }
        const forbiddenPrefix = forbiddenPrefixes?.find(prefix => name.startsWith(prefix));
        if (forbiddenPrefix) {
          return `not have "${forbiddenPrefix}" prefix`;
        }
        const forbiddenSuffix = forbiddenSuffixes?.find(suffix => name.endsWith(suffix));
        if (forbiddenSuffix) {
          return `not have "${forbiddenSuffix}" suffix`;
        }
        if (style && !ALLOWED_STYLES.includes(style)) {
          return `be in one of the following options: ${ALLOWED_STYLES.join(', ')}`;
        }
        const caseRegex = StyleToRegex[style];
        if (caseRegex && !caseRegex.test(name)) {
          return `be in ${style} format`;
        }
      }
    };

    const checkUnderscore = (node: GraphQLESTreeNode<NameNode>) => {
      const name = node.value;
      context.report({
        loc: getLocation(node.loc, name),
        message: `${name.startsWith('_') ? 'Leading' : 'Trailing'} underscores are not allowed`,
      });
    };

    const listeners: GraphQLESLintRuleListener = {};

    if (!allowLeadingUnderscore) {
      listeners['Name[value=/^_/]:matches([parent.kind!=Field], [parent.kind=Field][parent.alias])'] = checkUnderscore;
    }
    if (!allowTrailingUnderscore) {
      listeners['Name[value=/_$/]:matches([parent.kind!=Field], [parent.kind=Field][parent.alias])'] = checkUnderscore;
    }

    const selectors = new Set(
      [types && TYPES_KINDS, fields && FIELDS_KINDS, Object.keys(restOptions)].flat().filter(Boolean)
    );

    for (const selector of selectors) {
      listeners[selector] = checkNode(selector);
    }

    return listeners;
  },
};

export default rule;
