import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { loadDocumentsSync } from '@graphql-tools/load';
import { Loader, SingleFileOptions, Source } from '@graphql-tools/utils';
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

export type FragmentSource = { filePath: string; document: FragmentDefinitionNode };
export type OperationSource = { filePath: string; document: OperationDefinitionNode };

export const operationsLoaders: Loader<string, SingleFileOptions>[] = [
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
];

export type SiblingOperations = {
  available: boolean;
  getOperations(): OperationSource[];
  getFragments(): FragmentSource[];
  getFragment(fragmentName: string): FragmentSource[];
  getFragmentByType(typeName: string): FragmentSource[];
  getFragmentsInUse(
    baseOperation: OperationDefinitionNode | FragmentDefinitionNode | SelectionSetNode,
    recursive: boolean
  ): FragmentDefinitionNode[];
  getOperation(operationName: string): OperationSource[];
  getOperationByType(operationType: 'query' | 'mutation' | 'subscription'): OperationSource[];
};

function loadSiblings(baseDir: string, loadPaths: string[]): Source[] {
  return loadDocumentsSync(loadPaths, {
    cwd: baseDir,
    loaders: operationsLoaders,
  });
}

const operationsCache: Map<string, Source[]> = new Map();
const siblingOperationsCache: Map<Source[], SiblingOperations> = new Map();

export function getSiblingOperations(options: ParserOptions, gqlConfig: GraphQLConfig): SiblingOperations {
  let siblings: Source[] | null = null;

  // We first try to use graphql-config for loading the operations paths, based on the type of the file,
  // We are using the directory of the file as the key for the schema caching, to avoid reloading of the schema.
  if (gqlConfig && options?.filePath) {
    const fileDir = dirname(options.filePath);

    if (operationsCache.has(fileDir)) {
      siblings = operationsCache.get(fileDir);
    } else {
      const projectForFile = gqlConfig.getProjectForFile(options.filePath);

      if (projectForFile) {
        siblings = projectForFile.getDocumentsSync();
        operationsCache.set(fileDir, siblings);
      }
    }
  }

  if (!siblings && options?.operations) {
    const loadPaths = Array.isArray(options.operations) ? options.operations : [options.operations];
    const loadKey = loadPaths.join(',');

    if (operationsCache.has(loadKey)) {
      siblings = operationsCache.get(loadKey);
    } else {
      siblings = loadSiblings(process.cwd(), loadPaths);
      operationsCache.set(loadKey, siblings);
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
      getFragmentsInUse: noopWarn,
    };
  }

  // Since the siblings array is cached, we can use it as cache key.
  // We should get the same array reference each time we get
  // to this point for the same graphql project
  if (siblingOperationsCache.has(siblings)) {
    return siblingOperationsCache.get(siblings);
  }

  let fragmentsCache: FragmentSource[] | null = null;

  const getFragments = (): FragmentSource[] => {
    if (fragmentsCache === null) {
      const result: FragmentSource[] = [];

      for (const source of siblings) {
        for (const definition of source.document.definitions || []) {
          if (definition.kind === Kind.FRAGMENT_DEFINITION) {
            result.push({
              filePath: source.location,
              document: definition,
            });
          }
        }
      }

      fragmentsCache = result;
    }

    return fragmentsCache;
  };

  let cachedOperations: OperationSource[] | null = null;

  const getOperations = (): OperationSource[] => {
    if (cachedOperations === null) {
      const result: OperationSource[] = [];

      for (const source of siblings) {
        for (const definition of source.document.definitions || []) {
          if (definition.kind === Kind.OPERATION_DEFINITION) {
            result.push({
              filePath: source.location,
              document: definition,
            });
          }
        }
      }

      cachedOperations = result;
    }

    return cachedOperations;
  };

  const getFragment = (name: string) => getFragments().filter(f => f.document.name?.value === name);

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
            collected.set(spread.name.value, fragment.document);

            if (recursive) {
              collectFragments(fragment.document, recursive, collected);
            }
          }
        }
      },
    });

    return collected;
  };

  const siblingOperations = {
    available: true,
    getFragments,
    getOperations,
    getFragment,
    getFragmentByType: (typeName: string) =>
      getFragments().filter(f => f.document.typeCondition?.name?.value === typeName),
    getOperation: (name: string) => getOperations().filter(o => o.document.name?.value === name),
    getOperationByType: type => getOperations().filter(o => o.document.operation === type),
    getFragmentsInUse: (selectable, recursive = true) => Array.from(collectFragments(selectable, recursive).values()),
  };
  siblingOperationsCache.set(siblings, siblingOperations);
  return siblingOperations;
}
