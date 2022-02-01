import { ASTKindToNode, Kind, NameNode } from 'graphql';
import { GraphQLESLintRule, ValueOf } from '../types';
import { TYPES_KINDS, convertCase } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';
import { GraphQLESLintRuleListener } from '../testkit';

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
  ignorePattern?: string;
};

type Options = AllowedStyle | PropertySchema;

export type NamingConventionRuleConfig = {
  allowLeadingUnderscore?: boolean;
  allowTrailingUnderscore?: boolean;
  types?: Options;
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
          usage: [{ types: 'PascalCase', FieldDefinition: 'camelCase' }],
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
          usage: [{ types: 'PascalCase', FieldDefinition: 'camelCase' }],
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
        {
          title: 'Correct',
          usage: [{ FieldDefinition: { style: 'camelCase', ignorePattern: '^(EAN13|UPC|UK)' } }],
          code: /* GraphQL */ `
            type Product {
              EAN13: String
              UPC: String
              UKFlag: String
            }
          `,
        },
      ],
      configOptions: {
        schema: [
          {
            types: 'PascalCase',
            FieldDefinition: 'camelCase',
            InputValueDefinition: 'camelCase',
            Argument: 'camelCase',
            DirectiveDefinition: 'camelCase',
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
    hasSuggestions: true,
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
            ignorePattern: {
              type: 'string',
              description: 'Option to skip validation of some words, e.g. acronyms',
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
    const { allowLeadingUnderscore, allowTrailingUnderscore, types, ...restOptions } = options;

    function normalisePropertyOption(kind: string): PropertySchema {
      const style: Options = restOptions[kind] || types;
      return typeof style === 'object' ? style : { style };
    }

    const checkNode = (selector: string) => (n: GraphQLESTreeNode<ValueOf<AllowedKindToNode>>) => {
      const { name: node } = n.kind === Kind.VARIABLE_DEFINITION ? n.variable : n;
      if (!node) {
        return;
      }
      const { prefix, suffix, forbiddenPrefixes, forbiddenSuffixes, style, ignorePattern } =
        normalisePropertyOption(selector);
      const nodeType = KindToDisplayName[n.kind] || n.kind;
      const nodeName = node.value;
      const error = getError();
      if (error) {
        const { errorMessage, renameToName } = error;
        const [leadingUnderscores] = nodeName.match(/^_*/);
        const [trailingUnderscores] = nodeName.match(/_*$/);
        const suggestedName = leadingUnderscores + renameToName + trailingUnderscores;
        context.report({
          node,
          message: `${nodeType} "${nodeName}" should ${errorMessage}`,
          suggest: [
            {
              desc: `Rename to "${suggestedName}"`,
              fix: fixer => fixer.replaceText(node as any, suggestedName),
            },
          ],
        });
      }

      function getError(): {
        errorMessage: string;
        renameToName: string;
      } | void {
        const name = nodeName.replace(/(^_+)|(_+$)/g, '');
        if (ignorePattern && new RegExp(ignorePattern, 'u').test(name)) {
          return;
        }
        if (prefix && !name.startsWith(prefix)) {
          return {
            errorMessage: `have "${prefix}" prefix`,
            renameToName: prefix + name,
          };
        }
        if (suffix && !name.endsWith(suffix)) {
          return {
            errorMessage: `have "${suffix}" suffix`,
            renameToName: name + suffix,
          };
        }
        const forbiddenPrefix = forbiddenPrefixes?.find(prefix => name.startsWith(prefix));
        if (forbiddenPrefix) {
          return {
            errorMessage: `not have "${forbiddenPrefix}" prefix`,
            renameToName: name.replace(new RegExp(`^${forbiddenPrefix}`), ''),
          };
        }
        const forbiddenSuffix = forbiddenSuffixes?.find(suffix => name.endsWith(suffix));
        if (forbiddenSuffix) {
          return {
            errorMessage: `not have "${forbiddenSuffix}" suffix`,
            renameToName: name.replace(new RegExp(`${forbiddenSuffix}$`), ''),
          };
        }
        // Style is optional
        if (!style) {
          return;
        }
        const caseRegex = StyleToRegex[style];
        if (!caseRegex.test(name)) {
          return {
            errorMessage: `be in ${style} format`,
            renameToName: convertCase(style, name),
          };
        }
      }
    };

    const checkUnderscore = (isLeading: boolean) => (node: GraphQLESTreeNode<NameNode>) => {
      const name = node.value;
      const renameToName = name.replace(new RegExp(isLeading ? '^_+' : '_+$'), '');
      context.report({
        node,
        message: `${isLeading ? 'Leading' : 'Trailing'} underscores are not allowed`,
        suggest: [
          {
            desc: `Rename to "${renameToName}"`,
            fix: fixer => fixer.replaceText(node as any, renameToName),
          },
        ],
      });
    };

    const listeners: GraphQLESLintRuleListener = {};

    if (!allowLeadingUnderscore) {
      listeners['Name[value=/^_/]:matches([parent.kind!=Field], [parent.kind=Field][parent.alias])'] =
        checkUnderscore(true);
    }
    if (!allowTrailingUnderscore) {
      listeners['Name[value=/_$/]:matches([parent.kind!=Field], [parent.kind=Field][parent.alias])'] =
        checkUnderscore(false);
    }

    const selectors = new Set([types && TYPES_KINDS, Object.keys(restOptions)].flat().filter(Boolean));

    for (const selector of selectors) {
      listeners[selector] = checkNode(selector);
    }
    return listeners;
  },
};

export default rule;
