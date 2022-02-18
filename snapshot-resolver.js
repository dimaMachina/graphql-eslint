const SNAPSHOT_EXTENSION = '.md';

module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath(testPath) {
    return testPath.replace('tests/', 'tests/__snapshots__/').replace(/\.ts$/, '') + SNAPSHOT_EXTENSION;
  },
  // resolves from snapshot to test path
  resolveTestPath(snapshotFilePath) {
    return snapshotFilePath.replace('__snapshots__/', '').slice(0, -SNAPSHOT_EXTENSION.length) + '.ts';
  },
  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'tests/example.spec.ts',
};
