import { defineConfig, Options } from 'tsup';
import fs, { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import packageJson from './package.json';

const opts: Options = {
  entry: ['src/**/*.ts'],
  clean: true,
  bundle: false,
  dts: true,
};

const CWD = process.cwd();

export default defineConfig([
  {
    ...opts,
    format: 'esm',
    outDir: 'dist/esm',
    env: {
      NODE_ENV: 'production',
    },
    outExtension: () => ({ js: '.js' }),
    async onSuccess() {
      await fs.copyFile(
        path.join(CWD, '..', '..', 'README.md'),
        path.join(CWD, 'dist', 'README.md'),
      );
      await fs.writeFile(path.join(CWD, 'dist', 'esm', 'package.json'), '{"type": "module"}');
      await fs.writeFile(
        path.join(CWD, 'dist', 'package.json'),
        JSON.stringify({ ...packageJson, devDependencies: undefined }).replaceAll('dist/', ''),
      );

      const filePaths = [
        'estree-converter/utils.js',
        'rules/graphql-js-validation.js',
        'testkit.js',
      ];
      await Promise.all(
        filePaths.map(async filePath => {
          const fullPath = path.join(CWD, 'dist', 'esm', filePath);
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

      console.log('✅ Success!');
    },
  },
  {
    ...opts,
    format: 'cjs',
    outDir: 'dist/cjs',
    env: {
      NODE_ENV: 'production',
    },
  },
]);
