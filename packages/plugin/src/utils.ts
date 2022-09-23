import { statSync } from 'fs';
import { dirname } from 'path';
import type { GraphQLSchema } from 'graphql';
import { Kind } from 'graphql';
import type { AST } from 'eslint';
import lowerCase from 'lodash.lowercase';
import chalk from 'chalk';
import type { Position } from 'estree';
import type { GraphQLESLintRuleContext } from './types';
import type { SiblingOperations } from './sibling-operations';

export function requireSiblingsOperations(
  ruleId: string,
  context: GraphQLESLintRuleContext
): SiblingOperations | never {
  const { siblingOperations } = context.parserServices;
  if (!siblingOperations.available) {
    throw new Error(
      `Rule \`${ruleId}\` requires \`parserOptions.operations\` to be set and loaded. See https://bit.ly/graphql-eslint-operations for more info`
    );
  }
  return siblingOperations;
}

export function requireGraphQLSchemaFromContext(
  ruleId: string,
  context: GraphQLESLintRuleContext
): GraphQLSchema | never {
  const { schema } = context.parserServices;
  if (!schema) {
    throw new Error(
      `Rule \`${ruleId}\` requires \`parserOptions.schema\` to be set and loaded. See https://bit.ly/graphql-eslint-schema for more info`
    );
  } else if (schema instanceof Error) {
    throw schema;
  }
  return schema;
}

export const logger = {
  // eslint-disable-next-line no-console
  error: (...args) => console.error(chalk.red('error'), '[graphql-eslint]', chalk(...args)),
  // eslint-disable-next-line no-console
  warn: (...args) => console.warn(chalk.yellow('warning'), '[graphql-eslint]', chalk(...args)),
};

export const normalizePath = (path: string): string => (path || '').replace(/\\/g, '/');

/**
 * https://github.com/prettier/eslint-plugin-prettier/blob/76bd45ece6d56eb52f75db6b4a1efdd2efb56392/eslint-plugin-prettier.js#L71
 * Given a filepath, get the nearest path that is a regular file.
 * The filepath provided by eslint may be a virtual filepath rather than a file
 * on disk. This attempts to transform a virtual path into an on-disk path
 */
export const getOnDiskFilepath = (filepath: string): string => {
  try {
    if (statSync(filepath).isFile()) {
      return filepath;
    }
  } catch (err) {
    // https://github.com/eslint/eslint/issues/11989
    if (err.code === 'ENOTDIR') {
      return getOnDiskFilepath(dirname(filepath));
    }
  }

  return filepath;
};

export const getTypeName = (node): string =>
  'type' in node ? getTypeName(node.type) : node.name.value;

export const TYPES_KINDS = [
  Kind.OBJECT_TYPE_DEFINITION,
  Kind.INTERFACE_TYPE_DEFINITION,
  Kind.ENUM_TYPE_DEFINITION,
  Kind.SCALAR_TYPE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION,
  Kind.UNION_TYPE_DEFINITION,
] as const;

export type CaseStyle = 'camelCase' | 'PascalCase' | 'snake_case' | 'UPPER_CASE' | 'kebab-case';

const pascalCase = (str: string): string =>
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

declare namespace Intl {
  class ListFormat {
    constructor(locales: string, options: any);

    public format: (items: [string]) => string;
  }
}

export const englishJoinWords = words =>
  new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);
