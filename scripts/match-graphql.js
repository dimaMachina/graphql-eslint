import fs from 'node:fs';
import path from 'node:path';
// import pkg from '../package.json' assert { type: 'json' };
const CWD = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(CWD, '..', 'package.json')));

const pkgPath = path.join(CWD, 'package.json');
const version = process.argv[2];

if (pkg.resolutions.graphql.startsWith(version)) {
  console.info(`GraphQL v${version} is match! Skipping.`);
  process.exit();
}

const npmVersion = version.includes('-') ? version : `^${version}`;
pkg.resolutions.graphql = npmVersion;

await fs.promises.writeFile(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
await fs.promises.appendFile(path.join(CWD, '.prettierignore'), '\npackage.json');
