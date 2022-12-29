import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    resolveSnapshotPath: testPath =>
      testPath.replace('tests/', 'tests/__snapshots__/').replace(/\.ts$/, '.md'),
    setupFiles: ['./serializer.js'],
    alias: {
      '@graphql-eslint/eslint-plugin': 'packages/plugin/src/index.ts',
    },
  },
});
