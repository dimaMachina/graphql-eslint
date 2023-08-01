import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    resolveSnapshotPath: testPath =>
      testPath.replace('tests/', 'tests/__snapshots__/').replace(/\.ts$/, '.md'),
    setupFiles: ['./serializer.ts'],
    alias: {
      '@graphql-eslint/eslint-plugin': 'src/index.ts',
    },
  },
});
