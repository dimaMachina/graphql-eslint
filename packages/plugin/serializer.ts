// @ts-expect-error -- add `"type": "module"` to `package.json` to fix this
import rawSnapshotSerializer from 'jest-snapshot-serializer-raw/always';

expect.addSnapshotSerializer(rawSnapshotSerializer);
