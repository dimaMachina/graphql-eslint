import pkgJson from '../packages/plugin/dist/package.json';
import { writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), './packages/plugin/dist');

const withoutEsmPkgJson = {
  ...pkgJson,
  module: undefined,
  exports: {
    ...pkgJson.exports,
    '.': {
      require: pkgJson.exports['.'].require,
    },
  },
};

console.time('done');
await writeFile(`${DIST_DIR}/package.json`, JSON.stringify(withoutEsmPkgJson, null, 2));
await rm(`${DIST_DIR}/esm/`, { recursive: true, force: true });
console.timeEnd('done');
