import path from 'node:path';
// @ts-expect-error -- add `"type": "module"` to `package.json` to fix this
import { defineConfig } from 'vitest/config';

const GRAPHQL_PATH = path.join(__dirname, 'node_modules', 'graphql');

export default defineConfig({
  test: {
    globals: true,
    resolveSnapshotPath: testPath =>
      testPath.replace('__tests__/', '__tests__/__snapshots__/').replace(/\.ts$/, '.md'),
    setupFiles: ['./serializer.ts'],
    alias: {
      '@graphql-eslint/eslint-plugin': 'src/index.ts',
      // fixes Duplicate "graphql" modules cannot be used at the same time since different
      'graphql/validation/index.js': path.join(GRAPHQL_PATH, 'validation', 'index.js'),
      'graphql/validation/validate.js': path.join(GRAPHQL_PATH, 'validation', 'validate.js'),
      'graphql/utilities/valueFromASTUntyped.js': path.join(
        GRAPHQL_PATH,
        'utilities',
        'valueFromASTUntyped.js',
      ),
      graphql: path.join(GRAPHQL_PATH, 'index.js'),
    },
  },
});
