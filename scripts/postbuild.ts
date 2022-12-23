import { writeFile, rm, appendFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), './packages/plugin/dist');

console.time('done');

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

// add package.json with type: module to esm directory because ESLint throws an error
// SyntaxError: Cannot use import statement outside a module
await writeFile(`${DIST_DIR}/esm/package.json`, '{ "type": "module" }\n');
console.timeEnd('done');

async function addCreateRequireBanner(): Promise<void> {
  const filePaths = ['estree-converter/utils.js', 'rules/graphql-js-validation.js', 'testkit.js'];
  await Promise.all(
    filePaths.map(async filePath => {
      const fullPath = `${DIST_DIR}/esm/${filePath}`;
      const content = await readFile(fullPath, 'utf8');
      await writeFile(
        fullPath,
        `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
${content}`.trimStart(),
      );
    }),
  );
}

await addCreateRequireBanner();
