// @ts-expect-error -- add `"type": "module"` to `package.json` to fix this
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    resolveSnapshotPath: testPath =>
      testPath.replace('__tests__/', '__tests__/__snapshots__/').replace(/\.ts$/, '.md'),
    setupFiles: ['./serializer.ts'],
    alias: {
      '@graphql-eslint/eslint-plugin': 'src/index.ts',
    },
  },
});
