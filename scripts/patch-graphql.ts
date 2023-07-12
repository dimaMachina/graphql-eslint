/*
 * This script fixes an error from vite
 * Duplicate "graphql" modules cannot be used at the same time since different
 * taken from https://github.com/vitejs/vite/issues/7879#issuecomment-1156166452
 */

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(path.resolve('./packages/plugin/src'));

fs.promises
  .unlink(require.resolve('graphql').replace(/\.js$/, '.mjs'))
  // ignore if file not exist (was already patched)
  .catch(() => null);
