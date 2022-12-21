import { defineConfig } from 'vitest/config';

const SNAPSHOT_EXTENSION = '.md';

export default defineConfig({
  test: {
    globals: true,
    resolveSnapshotPath(testPath) {
      return (
        testPath.replace('tests/', 'tests/__snapshots__/').replace(/\.ts$/, '') + SNAPSHOT_EXTENSION
      );
    },
    setupFiles: ['./serializer.js'],
  },
});
