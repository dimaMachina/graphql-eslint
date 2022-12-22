import pkgJson from '../packages/plugin/dist/package.json';
import { writeFile, rm, appendFile } from 'node:fs/promises';
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

await Promise.all(
  // ESLint in commonjs import configs as `module.exports`, but bob bundles them as `exports.default`
  // variable
  [
    'base',
    'operations-all',
    'operations-recommended',
    'relay',
    'schema-all',
    'schema-recommended',
  ].map(filename =>
    appendFile(`${DIST_DIR}/cjs/configs/${filename}.js`, 'module.exports = exports.default;\n'),
  ),
);

// cjs/package.json provokes error Cannot find module '@graphql-eslint/eslint-plugin'
// so we remove it
await rm(`${DIST_DIR}/cjs/package.json`);
console.timeEnd('done');
