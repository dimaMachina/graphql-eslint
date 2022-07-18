import { resolve } from 'path';
import {
  FragmentDefinitionNode,
  Kind,
  OperationDefinitionNode,
  SelectionSetNode,
  visit,
  OperationTypeNode,
} from 'graphql';
import { Source, asArray } from '@graphql-tools/utils';
import { GraphQLProjectConfig } from 'graphql-config';
import debugFactory from 'debug';
import fastGlob from 'fast-glob';
import { logger } from './utils';
import type { Pointer } from './types';

export type FragmentSource = { filePath: string; document: FragmentDefinitionNode };
export type OperationSource = { filePath: string; document: OperationDefinitionNode };

const debug = debugFactory('graphql-eslint:operations');

export type SiblingOperations = {
  available: boolean;
  getFragment(fragmentName: string): FragmentSource[];
  getFragments(): FragmentSource[];
  getFragmentByType(typeName: string): FragmentSource[];
  getFragmentsInUse(
    baseOperation: OperationDefinitionNode | FragmentDefinitionNode | SelectionSetNode,
    recursive?: boolean
  ): FragmentDefinitionNode[];
  getOperation(operationName: string): OperationSource[];
  getOperations(): OperationSource[];
  getOperationByType(operationType: OperationTypeNode): OperationSource[];
};

type VirtualSource = Source & { realLocation: string };

function setArrayMap(key, value, map) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(value);
}

const handleVirtualPath = (documents: Source[]): Map<string, VirtualSource[]> => {
  const filepathMap: Map<string, VirtualSource[]> = new Map();

  documents.forEach(source => {
    const { location } = source;
    if (['.gql', '.graphql'].some(extension => location.endsWith(extension))) {
      setArrayMap(source.location, source, filepathMap);
      return;
    }
    filepathMap[location] ??= -1;
    const index = (filepathMap[location] += 1);
    setArrayMap(
      source.location,
      {
        ...source,
        location: resolve(location, `${index}_document.graphql`),
      },
      filepathMap
    );
  });

  return filepathMap;
};

const operationsCache = new Map<string, Map<string, VirtualSource[]>>();
const siblingOperationsCache = new Map<VirtualSource[], SiblingOperations>();

const getSiblings = (projectForFile: GraphQLProjectConfig, realFilepath: string): VirtualSource[] => {
  const documentsKey = asArray(projectForFile.documents).sort().join(',');

  if (!documentsKey) {
    return [];
  }

  let siblings = operationsCache.get(documentsKey);
  if (!siblings) {
    debug('Loading operations from %o', projectForFile.documents);
    const documents = projectForFile.loadDocumentsSync(projectForFile.documents, {
      skipGraphQLImport: true,
    });
    if (debug.enabled) {
      debug('Loaded %d operations', documents.length);
      const operationsPaths = fastGlob.sync(projectForFile.documents as Pointer, {
        absolute: true,
      });
      debug('Operations pointers %O', operationsPaths);
    }
    siblings = handleVirtualPath(documents);
    operationsCache.set(documentsKey, siblings);
  } else {
    siblings = operationsCache.get(documentsKey);
    if (siblings.get(realFilepath)) {
      const documents = projectForFile.loadDocumentsSync(realFilepath, {
        skipGraphQLImport: true,
      });
      const operationsForFile = handleVirtualPath(documents).get(realFilepath);
      siblings.set(realFilepath, operationsForFile);
    }
  }

  return Array.from(siblings.values()).flat();
};

export function getSiblingOperations(projectForFile: GraphQLProjectConfig, realFilepath: string): SiblingOperations {
  const siblings = getSiblings(projectForFile, realFilepath);

  if (siblings.length === 0) {
    let printed = false;

    const noopWarn = () => {
      if (!printed) {
        logger.warn(
          'getSiblingOperations was called without any operations. Make sure to set "parserOptions.operations" to make this feature available!'
        );
        printed = true;
      }
      return [];
    };

    return {
      available: false,
      getFragment: noopWarn,
      getFragments: noopWarn,
      getFragmentByType: noopWarn,
      getFragmentsInUse: noopWarn,
      getOperation: noopWarn,
      getOperations: noopWarn,
      getOperationByType: noopWarn,
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
        for (const definition of source.document.definitions) {
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
        for (const definition of source.document.definitions) {
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
    recursive,
    collected = new Map<string, FragmentDefinitionNode>()
  ) => {
    visit(selectable, {
      FragmentSpread(spread) {
        const fragmentName = spread.name.value;
        const [fragment] = getFragment(fragmentName);

        if (!fragment) {
          logger.warn(
            `Unable to locate fragment named "${fragmentName}", please make sure it's loaded using "parserOptions.operations"`
          );
          return;
        }
        if (!collected.has(fragmentName)) {
          collected.set(fragmentName, fragment.document);
          if (recursive) {
            collectFragments(fragment.document, recursive, collected);
          }
        }
      },
    });
    return collected;
  };

  const siblingOperations: SiblingOperations = {
    available: true,
    getFragment,
    getFragments,
    getFragmentByType: typeName => getFragments().filter(f => f.document.typeCondition?.name?.value === typeName),
    getFragmentsInUse: (selectable, recursive = true) => Array.from(collectFragments(selectable, recursive).values()),
    getOperation: name => getOperations().filter(o => o.document.name?.value === name),
    getOperations,
    getOperationByType: type => getOperations().filter(o => o.document.operation === type),
  };

  siblingOperationsCache.set(siblings, siblingOperations);
  return siblingOperations;
}
