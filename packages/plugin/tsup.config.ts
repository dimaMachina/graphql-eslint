import fs from 'node:fs/promises';
import path from 'node:path';
import { defineConfig, Options } from 'tsup';
import { CWD } from '@/utils.js';
import packageJson from './package.json' with { type: 'json' };

const opts: Options = {
  entry: ['src/**/*.ts', '!src/index.browser.ts', '!src/**/*.test.ts'],
  clean: true,
  splitting: true,
  bundle: false,
  dts: true,
  env: {
    ...(process.env.NODE_ENV && { NODE_ENV: process.env.NODE_ENV }),
    VERSION: packageJson.version,
  },
  format: 'esm',
  outExtension: () => ({ js: '.js' }),
  esbuildOptions(options, _context) {
    options.define!.window = 'undefined';
  },
};

export default defineConfig([
  {
    ...opts,
    outDir: 'dist/esm',
    target: 'esnext',
    esbuildPlugins: [
      {
        name: 'inject-create-require',
        setup(build) {
          build.onLoad({ filter: /schema\.ts$/ }, async args => {
            const code = await fs.readFile(args.path, 'utf8');
            const index = code.indexOf('export function getSchema');

            if (index === -1) {
              throw new Error('Unable to inject `createRequire` for file ' + args.path);
            }

            return {
              contents: [
                'import { createRequire } from "module"',
                code.slice(0, index),
                'const require = createRequire(import.meta.url)',
                code.slice(index),
              ].join('\n'),
              loader: 'ts',
            };
          });
        },
      },
    ],
  },
  {
    ...opts,
    format: 'cjs',
    outDir: 'dist/cjs',
    cjsInterop: true,
    async onSuccess() {
      await fs.copyFile(
        path.join(CWD, '..', '..', 'README.md'),
        path.join(CWD, 'dist', 'README.md'),
      );
      await fs.writeFile(path.join(CWD, 'dist', 'cjs', 'package.json'), '{"type": "commonjs"}');
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
      console.log('✅ Success!');
    },
  },
  {
    ...opts,
    entry: {
      'index.browser': 'src/index.ts',
    },
    outDir: 'dist',
    dts: false,
    bundle: true,
    env: {
      ...opts.env,
      NODE_ENV: 'production',
    },
    esbuildOptions(options, _context) {
      options.define!.window = 'true';
    },
    esbuildPlugins: [
      {
        name: 'remove-processor',
        setup(build) {
          build.onLoad({ filter: /\/src\/processor\.ts$/ }, _args => {
            return {
              contents: 'export const processor = {}',
              loader: 'ts',
            };
          });
        },
      },
    ],
  },
]);
