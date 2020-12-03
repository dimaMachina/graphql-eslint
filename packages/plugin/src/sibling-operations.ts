import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { loadDocumentsSync } from '@graphql-tools/load';
import { Source } from '@graphql-tools/utils';
import {
  FragmentDefinitionNode,
  FragmentSpreadNode,
  Kind,
  OperationDefinitionNode,
  parse,
  SelectionSetNode,
  visit,
} from 'graphql';
import { ParserOptions } from './types';
import { GraphQLConfig } from 'graphql-config';
import { dirname } from 'path';

export type SiblingOperations = {
  available: boolean;
  getOperations(): OperationDefinitionNode[];
  getFragments(): FragmentDefinitionNode[];
  getFragment(fragmentName: string): FragmentDefinitionNode[];
  getFragmentByType(typeName: string): FragmentDefinitionNode[];
  getUsedFragments(
    baseOperation: OperationDefinitionNode | FragmentDefinitionNode | SelectionSetNode,
    recursive: boolean
  ): FragmentDefinitionNode[];
  getOperation(operationName: string): OperationDefinitionNode[];
  getOperationByType(operationType: 'query' | 'mutation' | 'subscription'): OperationDefinitionNode[];
};

function loadSiblings(baseDir: string, loadPaths: string[]): Source[] {
  return loadDocumentsSync(loadPaths, {
    cwd: baseDir,
    loaders: [
      new GraphQLFileLoader(),
      new CodeFileLoader(),
      {
        loaderId: () => 'direct-string',
        canLoad: async () => false,
        load: async () => null,
        canLoadSync: pointer => typeof pointer === 'string' && pointer.includes('type '),
        loadSync: pointer => ({
          document: parse(pointer),
        }),
      },
    ],
  });
}

const operationsCache: Map<string, Source[]> = new Map();

export function getSiblingOperations(options: ParserOptions, gqlConfig: GraphQLConfig): SiblingOperations {
  let siblings: Source[] | null = null;

  // We first try to use graphql-config for loading the operations paths, based on the type of the file,
  // We are using the directory of the file as the key for the schema caching, to avoid reloading of the schema.
  if (options && options.filePath && !options.skipGraphQLConfig) {
    const fileDir = dirname(options.filePath);

    if (operationsCache.has(fileDir)) {
      siblings = operationsCache.get(fileDir);
    } else {
      if (gqlConfig) {
        const projectForFile = gqlConfig.getProject(options.filePath);

        if (projectForFile) {
          siblings = projectForFile.getDocumentsSync();
          operationsCache.set(fileDir, siblings);
        }
      }
    }
  }

  if (options && options.operations && !siblings) {
    const loadPaths = Array.isArray(options.operations) ? options.operations : [options.operations] || [];
    const loadKey = loadPaths.join(',');

    if (!operationsCache.has(loadKey)) {
      siblings = loadSiblings(process.cwd(), loadPaths);
      operationsCache.set(loadKey, siblings);
    } else {
      siblings = operationsCache.get(loadKey);
    }
  }

  if (!siblings || siblings.length === 0) {
    let printed = false;

    const noopWarn = () => {
      if (printed) {
        return [];
      }

      printed = true;
      // eslint-disable-next-line no-console
      console.warn(
        `getSiblingOperations was called without any operations. Make sure to set "parserOptions.operations" to make this feature available!`
      );

      return [];
    };

    return {
      available: false,
      getFragments: noopWarn,
      getOperations: noopWarn,
      getFragment: noopWarn,
      getFragmentByType: noopWarn,
      getOperation: noopWarn,
      getOperationByType: noopWarn,
      getUsedFragments: noopWarn,
    };
  }

  let fragmentsCache: FragmentDefinitionNode[] | null = null;

  const getFragments = (): FragmentDefinitionNode[] => {
    if (fragmentsCache === null) {
      const result: FragmentDefinitionNode[] = [];

      for (const source of siblings) {
        for (const definition of source.document.definitions || []) {
          if (definition.kind === Kind.FRAGMENT_DEFINITION) {
            result.push(definition);
          }
        }
      }

      fragmentsCache = result;
    }

    return fragmentsCache;
  };

  let cachedOperations: OperationDefinitionNode[] | null = null;

  const getOperations = (): OperationDefinitionNode[] => {
    if (operationsCache === null) {
      const result: OperationDefinitionNode[] = [];

      for (const source of siblings) {
        for (const definition of source.document.definitions || []) {
          if (definition.kind === Kind.OPERATION_DEFINITION) {
            result.push(definition);
          }
        }
      }

      cachedOperations = result;
    }

    return cachedOperations;
  };

  const getFragment = (name: string) => getFragments().filter(f => f.name?.value === name);

  const collectFragments = (
    selectable: SelectionSetNode | OperationDefinitionNode | FragmentDefinitionNode,
    recursive = true,
    collected: Map<string, FragmentDefinitionNode> = new Map()
  ) => {
    visit(selectable, {
      FragmentSpread: (spread: FragmentSpreadNode) => {
        const name = spread.name.value;
        const fragmentInfo = getFragment(name);

        if (fragmentInfo.length === 0) {
          // eslint-disable-next-line no-console
          console.warn(
            `Unable to locate fragment named "${name}", please make sure it's loaded using "parserOptions.operations"`
          );
        } else {
          const fragment = fragmentInfo[0];
          const alreadyVisited = collected.has(name);

          if (!alreadyVisited) {
            collected.set(spread.name.value, fragment);

            if (recursive) {
              collectFragments(fragment, recursive, collected);
            }
          }
        }
      },
    });

    return collected;
  };

  return {
    available: true,
    getFragments,
    getOperations,
    getFragment,
    getFragmentByType: (typeName: string) => getFragments().filter(f => f.typeCondition?.name?.value === typeName),
    getOperation: (name: string) => getOperations().filter(o => o.name?.value === name),
    getOperationByType: type => getOperations().filter(o => o.operation === type),
    getUsedFragments: (selectable, recursive = true) => Array.from(collectFragments(selectable, recursive).values()),
  };
}
