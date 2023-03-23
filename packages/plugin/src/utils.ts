import chalk from 'chalk';
import { AST } from 'eslint';
import { Position } from 'estree';
import { ASTNode, GraphQLSchema, Kind } from 'graphql';
import lowerCase from 'lodash.lowercase';
import { SiblingOperations } from './siblings.js';
import { GraphQLESLintRuleContext } from './types.js';
import { GraphQLESTreeNode } from './estree-converter/index.js';

export function requireSiblingsOperations(
  ruleId: string,
  context: GraphQLESLintRuleContext,
): SiblingOperations | never {
  const { siblingOperations } = context.parserServices;
  if (!siblingOperations.available) {
    throw new Error(
      `Rule \`${ruleId}\` requires \`parserOptions.operations\` to be set and loaded. See https://bit.ly/graphql-eslint-operations for more info`,
    );
  }
  return siblingOperations;
}

export function requireGraphQLSchemaFromContext(
  ruleId: string,
  context: GraphQLESLintRuleContext,
): GraphQLSchema | never {
  const { schema } = context.parserServices;
  if (!schema) {
    throw new Error(
      `Rule \`${ruleId}\` requires \`parserOptions.schema\` to be set and loaded. See https://bit.ly/graphql-eslint-schema for more info`,
    );
  }
  return schema;
}

export const logger = {
  error: (...args: unknown[]) =>
    // eslint-disable-next-line no-console
    console.error(chalk.red('error'), '[graphql-eslint]', chalk(...args)),
  warn: (...args: unknown[]) =>
    // eslint-disable-next-line no-console
    console.warn(chalk.yellow('warning'), '[graphql-eslint]', chalk(...args)),
};

export const normalizePath = (path: string): string => (path || '').replace(/\\/g, '/');

export const VIRTUAL_DOCUMENT_REGEX = /\/\d+_document.graphql$/;

export const CWD = process.cwd();

export const IS_BROWSER = typeof window !== 'undefined';

export const getTypeName = (node: ASTNode): string =>
  'type' in node ? getTypeName(node.type) : 'name' in node && node.name ? node.name.value : '';

export const TYPES_KINDS = [
  Kind.OBJECT_TYPE_DEFINITION,
  Kind.INTERFACE_TYPE_DEFINITION,
  Kind.ENUM_TYPE_DEFINITION,
  Kind.SCALAR_TYPE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION,
  Kind.UNION_TYPE_DEFINITION,
] as const;

export type CaseStyle = 'camelCase' | 'kebab-case' | 'PascalCase' | 'snake_case' | 'UPPER_CASE';

export const pascalCase = (str: string): string =>
  lowerCase(str)
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

export const camelCase = (str: string): string => {
  const result = pascalCase(str);
  return result.charAt(0).toLowerCase() + result.slice(1);
};

export const convertCase = (style: CaseStyle, str: string): string => {
  switch (style) {
    case 'camelCase':
      return camelCase(str);
    case 'PascalCase':
      return pascalCase(str);
    case 'snake_case':
      return lowerCase(str).replace(/ /g, '_');
    case 'UPPER_CASE':
      return lowerCase(str).replace(/ /g, '_').toUpperCase();
    case 'kebab-case':
      return lowerCase(str).replace(/ /g, '-');
  }
};

export function getLocation(start: Position, fieldName = ''): AST.SourceLocation {
  const { line, column } = start;
  return {
    start: {
      line,
      column,
    },
    end: {
      line,
      column: column + fieldName.length,
    },
  };
}

export const REPORT_ON_FIRST_CHARACTER = { column: 0, line: 1 };

export const ARRAY_DEFAULT_OPTIONS = {
  type: 'array',
  uniqueItems: true,
  minItems: 1,
  items: {
    type: 'string',
  },
} as const;

export const englishJoinWords = (words: string[]): string =>
  new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);

type Truthy<T> = T extends '' | 0 | false | null | undefined ? never : T; // from lodash

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}

const DisplayNodeNameMap: Record<string, string> = {
  [Kind.OBJECT_TYPE_DEFINITION]: 'type',
  [Kind.OBJECT_TYPE_EXTENSION]: 'type',
  [Kind.INTERFACE_TYPE_DEFINITION]: 'interface',
  [Kind.ENUM_TYPE_DEFINITION]: 'enum',
  [Kind.ENUM_TYPE_EXTENSION]: 'enum',
  [Kind.SCALAR_TYPE_DEFINITION]: 'scalar',
  [Kind.INPUT_OBJECT_TYPE_DEFINITION]: 'input',
  [Kind.UNION_TYPE_DEFINITION]: 'union',
  [Kind.DIRECTIVE_DEFINITION]: 'directive',
  [Kind.FIELD_DEFINITION]: 'field',
  [Kind.ENUM_VALUE_DEFINITION]: 'value',
  [Kind.INPUT_VALUE_DEFINITION]: 'value',
} as const;

export function displayNodeName(node: GraphQLESTreeNode<ASTNode>): string {
  return `${DisplayNodeNameMap[node.kind]} "${node.name.value}"`;
}

export function getNodeName(node: GraphQLESTreeNode<ASTNode>): string {
  switch (node.kind) {
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.DIRECTIVE_DEFINITION:
      return displayNodeName(node);
    case Kind.FIELD_DEFINITION:
    case Kind.INPUT_VALUE_DEFINITION:
    case Kind.ENUM_VALUE_DEFINITION:
      return `${displayNodeName(node)} in ${displayNodeName(node.parent)}`;
    case Kind.OPERATION_DEFINITION:
      return node.name ? `${node.operation} "${node.name.value}"` : node.operation;
  }
  return '';
}
