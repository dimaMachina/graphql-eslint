import { defineConfig, Options } from 'tsup';
import fs from 'node:fs/promises';
import path from 'node:path';
import packageJson from './package.json';

const opts: Options = {
  entry: ['src/**/*.ts'],
  clean: true,
  bundle: false,
  dts: true,
  env: {
    ...(process.env.NODE_ENV && { NODE_ENV: process.env.NODE_ENV }),
  },
};

const CWD = process.cwd();
export default defineConfig([
  {
    ...opts,
    format: 'esm',
    outDir: 'dist/esm',
    outExtension: () => ({ js: '.js' }),
    async onSuccess() {
      await fs.copyFile(
        path.join(CWD, '..', '..', 'README.md'),
        path.join(CWD, 'dist', 'README.md'),
      );
      await fs.writeFile(path.join(CWD, 'dist', 'esm', 'package.json'), '{"type": "module"}');
      await fs.writeFile(
        path.join(CWD, 'dist', 'package.json'),
        JSON.stringify(
          {
            ...packageJson,
            devDependencies: undefined,
            scripts: undefined,
          },
          null,
          2,
        ).replaceAll('dist/', ''),
      );
      addCreateRequireBanner([
        'estree-converter/utils.js',
        'rules/graphql-js-validation.js',
        'testkit.js',
      ]);
      console.log('✅ Success!');
    },
  },
  {
    ...opts,
    format: 'cjs',
    outDir: 'dist/cjs',
  },
]);

async function addCreateRequireBanner(filePaths: string[]): Promise<void> {
  await Promise.all(
    filePaths.map(async filePath => {
      const fullPath = path.join(CWD, 'dist', 'esm', filePath);
      const content = await fs.readFile(fullPath, 'utf8');
      await fs.writeFile(
        fullPath,
        `import { createRequire } from 'module';
const require = createRequire(import.meta.url);
${content}`,
      );
    }),
  );
}
