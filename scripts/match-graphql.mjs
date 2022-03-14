import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pkgPath = resolve(process.cwd(), 'package.json');
const version = process.argv[2];
const pkg = JSON.parse(readFileSync(pkgPath));

if (pkg.resolutions.graphql.startsWith(version)) {
  // eslint-disable-next-line no-console
  console.info(`GraphQL v${version} is match! Skipping.`);
  process.exit();
}

const npmVersion = version.includes('-') ? version : `^${version}`;
pkg.resolutions.graphql = npmVersion;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
