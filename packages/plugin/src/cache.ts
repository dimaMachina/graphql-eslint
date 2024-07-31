// Based on the `eslint-plugin-import`'s cache
// https://github.com/import-js/eslint-plugin-import/blob/main/utils/ModuleCache.js
import debugFactory from 'debug';

const log = debugFactory('graphql-eslint:ModuleCache');

export class ModuleCache<K, T> {
  map = new Map<K, { lastSeen: [number, number]; result: T }>();

  set(cacheKey: K, result: T): void {
    this.map.set(cacheKey, { lastSeen: process.hrtime(), result });
    log('setting entry for', cacheKey);
  }

  get(cacheKey: K, settings = { lifetime: 10 /* seconds */ }): T | void {
    const value = this.map.get(cacheKey);
    if (!value) {
      log('cache miss for', cacheKey);
      return;
    }
    const { lastSeen, result } = value;
    // check freshness
    if (
      process.env.NODE /* don't check for ESLint CLI */ ||
      process.hrtime(lastSeen)[0] < settings.lifetime
    ) {
      return result;
    }
  }
}
