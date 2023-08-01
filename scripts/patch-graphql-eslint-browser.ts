import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CWD = path.resolve(__dirname, '..');
const ROOT_DIR = path.join(CWD, 'packages', 'plugin', 'dist', 'esm');

async function patch(filePath: string, replace: (fileContent: string) => string): Promise<void> {
  const fullPath = `${ROOT_DIR}${filePath}`;
  const fileContent = await fs.readFile(fullPath, 'utf8');
  const patchComment = '// GRAPHQL-ESLINT BROWSER PATCH\n';
  const isAlreadyPatched = fileContent.startsWith(patchComment);
  const newContent = isAlreadyPatched ? fileContent : patchComment + replace(fileContent);
  await fs.writeFile(fullPath, newContent, 'utf8');
  console.log(`✅ ${path.relative(CWD, fullPath)} ${isAlreadyPatched ? 'already ' : ''}patched!`);
}

function commentLine(str: string): string {
  return `// ${str}`;
}

await patch('/index.js', str => str.replace('export * from "./testkit.js"', commentLine));

await patch('/parser.js', str =>
  str
    .replace('const gqlConfig = loadGraphQLConfig(options)', commentLine)
    .replace('const project = gqlConfig.getProjectForFile(realFilepath)', 'let project'),
);
