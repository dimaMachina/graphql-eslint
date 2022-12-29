import rawSnapshotSerializer from 'jest-snapshot-serializer-raw/always';
import { expect } from 'vitest';

expect.addSnapshotSerializer(rawSnapshotSerializer);
