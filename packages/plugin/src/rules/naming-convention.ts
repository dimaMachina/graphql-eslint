import { ASTKindToNode, Kind, NameNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRuleListener } from '../testkit.js';
import { GraphQLESLintRule, ValueOf } from '../types.js';
import { ARRAY_DEFAULT_OPTIONS, CaseStyle, convertCase, truthy, TYPES_KINDS } from '../utils.js';

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
  snake_case: /^[a-z][\d_a-z]*[\da-z]*$/,
  UPPER_CASE: /^[A-Z][\dA-Z_]*[\dA-Z]*$/,
};

const ALLOWED_KINDS = Object.keys(KindToDisplayName).sort() as AllowedKind[];
const ALLOWED_STYLES = Object.keys(StyleToRegex) as AllowedStyle[];

const schemaOption = {
  oneOf: [{ $ref: '#/definitions/asString' }, { $ref: '#/definitions/asObject' }],
} as const;

const schema = {
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
        forbiddenPrefixes: ARRAY_DEFAULT_OPTIONS,
        forbiddenSuffixes: ARRAY_DEFAULT_OPTIONS,
        requiredPrefixes: ARRAY_DEFAULT_OPTIONS,
        requiredSuffixes: ARRAY_DEFAULT_OPTIONS,
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
        description: `Includes:\n${TYPES_KINDS.map(kind => `- \`${kind}\``).join('\n')}`,
      },
      ...Object.fromEntries(
        ALLOWED_KINDS.map(kind => [
          kind,
          {
            ...schemaOption,
            description: `Read more about this kind on [spec.graphql.org](https://spec.graphql.org/October2021/#${kind}).`,
          },
        ]),
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
} as const;

const createRequiredPrefixNameSuggestions = (
  style: CaseStyle | undefined,
  requiredPrefixes: string[],
  name: string,
): string[] => {
  if (style === undefined)
    return requiredPrefixes.map(requiredPrefix => `${requiredPrefix}${name}`);

  // The underscore here is used to delineate a word, regardless of style,
  // which then will get transformed by convert case.
  return requiredPrefixes.map(requiredPrefix => convertCase(style, `${requiredPrefix}_${name}`));
};

const createRequiredSuffixNameSuggestions = (
  style: CaseStyle | undefined,
  requiredSuffixes: string[],
  name: string,
): string[] => {
  if (style === 'kebab-case' || style === 'snake_case')
    // The underscore here is used to delineate a word, regardless of style,
    // which then will get transformed by convert case.
    return requiredSuffixes.map(requiredSuffix => convertCase(style, `${name}_${requiredSuffix}`));

  return requiredSuffixes.map(requiredSuffix => `${name}${requiredSuffix}`);
};

const hasValidRequiredPrefix = (
  style: CaseStyle | undefined,
  name: string,
  requiredPrefixes: string[],
): boolean => {
  if (style === undefined)
    return requiredPrefixes.some(requiredPrefix => name.startsWith(requiredPrefix));

  let suffixStartingCharacter = '';

  if (style === 'PascalCase' || style === 'UPPER_CASE' || style === 'camelCase') {
    suffixStartingCharacter = '[\\dA-Z]';
  } else if (style === 'kebab-case') {
    suffixStartingCharacter = '-';
  } else if (style === 'snake_case') {
    suffixStartingCharacter = '_';
  }

  return requiredPrefixes.some(requiredPrefix =>
    new RegExp(`^${requiredPrefix}${suffixStartingCharacter}`).test(name),
  );
};

const hasValidRequiredSuffix = (
  style: CaseStyle | undefined,
  name: string,
  requiredSuffixes: string[],
): boolean => {
  if (style === undefined) {
    return requiredSuffixes.some(requiredSuffix => name.endsWith(requiredSuffix));
  }

  let prefixEndingCharacter = '';

  if (style === 'UPPER_CASE' || style === 'snake_case') {
    prefixEndingCharacter = '_';
  } else if (style === 'kebab-case') {
    prefixEndingCharacter = '-';
  } else if (style === 'PascalCase' || style === 'camelCase') {
    prefixEndingCharacter = '[\\da-z]';
  }

  return requiredSuffixes.some(requiredSuffix =>
    new RegExp(`${prefixEndingCharacter}${requiredSuffix}$`).test(name),
  );
};

export type RuleOptions = FromSchema<typeof schema>;

type PropertySchema = {
  style?: AllowedStyle;
  suffix?: string;
  prefix?: string;
  forbiddenPrefixes?: string[];
  forbiddenSuffixes?: string[];
  requiredPrefixes?: string[];
  requiredSuffixes?: string[];
  ignorePattern?: string;
};

type Options = AllowedStyle | PropertySchema;

type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require names to follow specified conventions.',
      category: ['Schema', 'Operations'],
      recommended: true,
      url: 'https://the-guild.dev/graphql/eslint/rules/naming-convention',
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
        {
          title: 'Correct',
          usage: [
            {
              'FieldDefinition[gqlType.name.value=Boolean]': {
                style: 'camelCase',
                requiredPrefixes: ['is', 'has'],
              },
              'FieldDefinition[gqlType.gqlType.name.value=Boolean]': {
                style: 'camelCase',
                requiredPrefixes: ['is', 'has'],
              },
            },
          ],
          code: /* GraphQL */ `
            type Product {
              isBackordered: Boolean
              isNew: Boolean!
              hasDiscount: Boolean!
            }
          `,
        },
        {
          title: 'Correct',
          usage: [
            {
              'FieldDefinition[gqlType.gqlType.name.value=SensitiveSecret]': {
                style: 'camelCase',
                requiredSuffixes: ['SensitiveSecret'],
              },
            },
          ],
          code: /* GraphQL */ `
            scalar SensitiveSecret

            type Account {
              accountSensitiveSecret: SensitiveSecret!
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
    schema,
  },
  create(context) {
    const options = context.options[0] || {};
    const { allowLeadingUnderscore, allowTrailingUnderscore, types, ...restOptions } = options;

    function normalisePropertyOption(kind: string): PropertySchema {
      const style = (restOptions[kind] || types) as Options;
      return typeof style === 'object' ? style : { style };
    }

    function report(
      node: GraphQLESTreeNode<NameNode>,
      message: string,
      suggestedNames: string[],
    ): void {
      context.report({
        node,
        message,
        suggest: suggestedNames.map(suggestedName => ({
          desc: `Rename to \`${suggestedName}\``,
          fix: fixer => fixer.replaceText(node as any, suggestedName),
        })),
      });
    }

    const checkNode = (selector: string) => (n: GraphQLESTreeNode<ValueOf<AllowedKindToNode>>) => {
      const { name: node } = n.kind === Kind.VARIABLE_DEFINITION ? n.variable : n;
      if (!node) {
        return;
      }
      const {
        prefix,
        suffix,
        forbiddenPrefixes,
        forbiddenSuffixes,
        style,
        ignorePattern,
        requiredPrefixes,
        requiredSuffixes,
      } = normalisePropertyOption(selector);
      const nodeType = KindToDisplayName[n.kind] || n.kind;
      const nodeName = node.value;
      const error = getError();
      if (error) {
        const { errorMessage, renameToNames } = error;
        const [leadingUnderscores] = nodeName.match(/^_*/) ?? [];
        const [trailingUnderscores] = nodeName.match(/_*$/) ?? [];
        const suggestedNames = renameToNames.map(
          renameToName => leadingUnderscores + renameToName + trailingUnderscores,
        );
        report(node, `${nodeType} "${nodeName}" should ${errorMessage}`, suggestedNames);
      }

      function generatePrefixOrSuffixErrorMessage(
        prefixesOrSuffixes: string[],
        kind: 'prefixes' | 'suffixes',
      ): string {
        const messagePrefixes =
          prefixesOrSuffixes.length === 1
            ? prefixesOrSuffixes[0]
            : prefixesOrSuffixes.slice(0, prefixesOrSuffixes.length - 1).join(', ') +
              `, or ${prefixesOrSuffixes[prefixesOrSuffixes.length - 1]}`;

        return `have one of the following ${kind}: ${messagePrefixes}`;
      }

      function getError(): {
        errorMessage: string;
        renameToNames: string[];
      } | void {
        const name = nodeName.replace(/(^_+)|(_+$)/g, '');
        if (ignorePattern && new RegExp(ignorePattern, 'u').test(name)) {
          return;
        }

        if (requiredPrefixes && !hasValidRequiredPrefix(style, name, requiredPrefixes)) {
          return {
            errorMessage: generatePrefixOrSuffixErrorMessage(requiredPrefixes, 'prefixes'),
            renameToNames: createRequiredPrefixNameSuggestions(style, requiredPrefixes, name),
          };
        }
        if (requiredSuffixes && !hasValidRequiredSuffix(style, name, requiredSuffixes)) {
          return {
            errorMessage: generatePrefixOrSuffixErrorMessage(requiredSuffixes, 'suffixes'),
            renameToNames: createRequiredSuffixNameSuggestions(style, requiredSuffixes, name),
          };
        }
        if (prefix && !name.startsWith(prefix)) {
          return {
            errorMessage: `have "${prefix}" prefix`,
            renameToNames: [prefix + name],
          };
        }
        if (suffix && !name.endsWith(suffix)) {
          return {
            errorMessage: `have "${suffix}" suffix`,
            renameToNames: [name + suffix],
          };
        }
        const forbiddenPrefix = forbiddenPrefixes?.find(prefix => name.startsWith(prefix));
        if (forbiddenPrefix) {
          return {
            errorMessage: `not have "${forbiddenPrefix}" prefix`,
            renameToNames: [name.replace(new RegExp(`^${forbiddenPrefix}`), '')],
          };
        }
        const forbiddenSuffix = forbiddenSuffixes?.find(suffix => name.endsWith(suffix));
        if (forbiddenSuffix) {
          return {
            errorMessage: `not have "${forbiddenSuffix}" suffix`,
            renameToNames: [name.replace(new RegExp(`${forbiddenSuffix}$`), '')],
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
            renameToNames: [convertCase(style, name)],
          };
        }
      }
    };

    const checkUnderscore = (isLeading: boolean) => (node: GraphQLESTreeNode<NameNode>) => {
      const suggestedName = node.value.replace(isLeading ? /^_+/ : /_+$/, '');
      report(node, `${isLeading ? 'Leading' : 'Trailing'} underscores are not allowed`, [
        suggestedName,
      ]);
    };

    const listeners: GraphQLESLintRuleListener = {};

    if (!allowLeadingUnderscore) {
      listeners[
        'Name[value=/^_/]:matches([parent.kind!=Field], [parent.kind=Field][parent.alias])'
      ] = checkUnderscore(true);
    }
    if (!allowTrailingUnderscore) {
      listeners[
        'Name[value=/_$/]:matches([parent.kind!=Field], [parent.kind=Field][parent.alias])'
      ] = checkUnderscore(false);
    }

    const selectors = new Set(
      [types && TYPES_KINDS, Object.keys(restOptions)].flat().filter(truthy),
    );

    for (const selector of selectors) {
      listeners[selector] = checkNode(selector);
    }
    return listeners;
  },
};
