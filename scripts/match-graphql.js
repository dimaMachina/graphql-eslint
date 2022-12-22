import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import pkg from '../package.json' assert { type: 'json' };

const pkgPath = path.resolve(process.cwd(), 'package.json');
const version = process.argv[2];

if (pkg.resolutions.graphql.startsWith(version)) {
  console.info(`GraphQL v${version} is match! Skipping.`);
  process.exit();
}

const npmVersion = version.includes('-') ? version : `^${version}`;
pkg.resolutions.graphql = npmVersion;

await writeFile(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
