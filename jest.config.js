module.exports = {
  modulePathIgnorePatterns: ['/dist/'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  snapshotSerializers: ['jest-snapshot-serializer-raw/always'],
  snapshotResolver: './snapshot-resolver.js',
};
