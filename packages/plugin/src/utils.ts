import { statSync } from 'fs';
import { dirname } from 'path';
import { GraphQLSchema, Kind } from 'graphql';
import type { AST } from 'eslint';
import { asArray, Source as LoaderSource } from '@graphql-tools/utils';
import lowerCase from 'lodash.lowercase';
import chalk from 'chalk';
import { GraphQLESLintRuleContext } from './types';
import { SiblingOperations } from './sibling-operations';
import type * as ESTree from 'estree';

export function requireSiblingsOperations(
  ruleName: string,
  context: GraphQLESLintRuleContext
): SiblingOperations | never {
  if (!context.parserServices) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.operations' to be set and loaded. See http://bit.ly/graphql-eslint-operations for more info`
    );
  }

  if (!context.parserServices.siblingOperations.available) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.operations' to be set and loaded. See http://bit.ly/graphql-eslint-operations for more info`
    );
  }

  return context.parserServices.siblingOperations;
}

export function requireGraphQLSchemaFromContext(
  ruleName: string,
  context: GraphQLESLintRuleContext
): GraphQLSchema | never {
  if (!context.parserServices) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.schema' to be set. See http://bit.ly/graphql-eslint-schema for more info`
    );
  }

  if (!context.parserServices.hasTypeInfo) {
    throw new Error(
      `Rule '${ruleName}' requires 'parserOptions.schema' to be set and schema to be loaded. See http://bit.ly/graphql-eslint-schema for more info`
    );
  }

  return context.parserServices.schema;
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

export const getTypeName = node => ('type' in node ? getTypeName(node.type) : node.name.value);

// Small workaround for the bug in older versions of @graphql-tools/load
// Can be removed after graphql-config bumps to a new version
export const loaderCache: Record<string, LoaderSource[]> = new Proxy(Object.create(null), {
  get(cache, key) {
    const value = cache[key];
    if (value) {
      return asArray(value);
    }
    return undefined;
  },
  set(cache, key, value) {
    if (value) {
      cache[key] = asArray(value);
    }
    return true;
  },
});

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

export function getLocation(start: ESTree.Position, fieldName = ''): AST.SourceLocation {
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
