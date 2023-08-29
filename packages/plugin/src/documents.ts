import { resolve } from 'node:path';
import debugFactory from 'debug';
import fg from 'fast-glob';
import { GraphQLProjectConfig } from 'graphql-config';
import { Source } from '@graphql-tools/utils';
import { ModuleCache } from './cache.js';
import { Pointer } from './types.js';

const debug = debugFactory('graphql-eslint:operations');
const operationsCache = new ModuleCache<Source[]>();

const handleVirtualPath = (documents: Source[]): Source[] => {
  const filepathMap: Record<string, number> = Object.create(null);

  return documents.map(source => {
    const location = source.location!;
    if (['.gql', '.graphql'].some(extension => location.endsWith(extension))) {
      return source;
    }
    filepathMap[location] ??= -1;
    const index = (filepathMap[location] += 1);
    return {
      ...source,
      location: resolve(location, `${index}_document.graphql`),
    };
  });
};

export const getDocuments = (project: GraphQLProjectConfig): Source[] => {
  const documentsKey = project.documents;
  if (!documentsKey) {
    return [];
  }

  let siblings = operationsCache.get(documentsKey);

  if (!siblings) {
    debug('Loading operations from %o', project.documents);
    const documents = project.loadDocumentsSync(project.documents, {
      skipGraphQLImport: true,
      pluckConfig: project.extensions.pluckConfig,
    });
    if (debug.enabled) {
      debug('Loaded %d operations', documents.length);
      const operationsPaths = fg.sync(project.documents as Pointer, { absolute: true });
      debug('Operations pointers %O', operationsPaths);
    }
    siblings = handleVirtualPath(documents);
    operationsCache.set(documentsKey, siblings);
  }

  return siblings;
};
