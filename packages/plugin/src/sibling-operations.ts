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

export function getSiblingOperations(baseDir: string, loadPaths: string[]): SiblingOperations {
  if (loadPaths.length === 0) {
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
  const loadKey = loadPaths.join(',');

  if (!operationsCache.has(loadKey)) {
    const loadedSiblings = loadSiblings(baseDir, loadPaths);
    operationsCache.set(loadKey, loadedSiblings);
  }

  const siblings = operationsCache.get(loadKey);

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
