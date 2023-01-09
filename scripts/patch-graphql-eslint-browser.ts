import path from 'node:path';
import fs from 'node:fs/promises';

const ROOT_DIR = path.join(process.cwd(), 'packages', 'plugin', 'dist', 'esm');

async function patch(filePath: string, replace: (fileContent: string) => string) {
  const fullPath = `${ROOT_DIR}${filePath}`;
  const fileContent = await fs.readFile(fullPath, 'utf8');
  const patchComment = '// GRAPHQL-ESLINT BROWSER PATCH\n';
  const isAlreadyPatched = fileContent.startsWith(patchComment);
  const newContent = isAlreadyPatched ? fileContent : patchComment + replace(fileContent);
  await fs.writeFile(fullPath, newContent, 'utf8');
  console.log(`✅${filePath} ${isAlreadyPatched ? 'already ' : ''}patched!`);
}

function commentLine(str: string): string {
  return `// ${str}`;
}

await patch('/index.js', str => {
  return str
    .replace("import { processor } from './processor.js'", commentLine)
    .replace("export * from './testkit.js'", commentLine)
    .replace('export const processors = { graphql: processor }', commentLine);
});

await patch('/parser.js', str => {
  return str
    .replace("import { loadGraphQLConfig } from './graphql-config.js'", commentLine)
    .replace('const gqlConfig = loadGraphQLConfig(options)', commentLine)
    .replace('const project = gqlConfig.getProjectForFile(realFilepath)', commentLine)
    .replace(
      'const schema = getSchema(project, options.schemaOptions)',
      () => `const schema = null`,
    )
    .replace('siblingOperations: getDocuments(project),', () => `siblingOperations: [],`);
});

await patch('/documents.js', str => {
  return str
    .replace("import fg from 'fast-glob'", commentLine)
    .replace('const operationsPaths = fg.sync(project.documents, { absolute: true })', commentLine)
    .replace("debug('Operations pointers %O', operationsPaths)", commentLine);
});

await patch('/schema.js', str => {
  return str
    .replace("import fg from 'fast-glob'", commentLine)
    .replace('const schemaPaths = fg.sync(project.schema, { absolute: true })', commentLine)
    .replace("debug('Schema pointers %O', schemaPaths)", commentLine);
});

await patch('/estree-converter/utils.js', str => {
  return str
    .replace("import { createRequire } from 'module'", commentLine)
    .replace('const require = createRequire(import.meta.url)', commentLine)
    .replace(
      'function getLexer(source) {',
      m => `import { Lexer } from 'graphql'\n${m}\n    return Lexer(source)`,
    );
});

await patch('/rules/graphql-js-validation.js', str => {
  return (
    "import * as allGraphQLJSRules from 'graphql/validation'\n" +
    str
      .replace("import { createRequire } from 'module'", commentLine)
      .replace('const require = createRequire(import.meta.url)', commentLine)
      .replace(
        `    let ruleFn = null;
    try {
        ruleFn = require(\`graphql/validation/rules/\${ruleName}Rule\`)[\`\${ruleName}Rule\`];
    }
    catch (_a) {
        try {
            ruleFn = require(\`graphql/validation/rules/\${ruleName}\`)[\`\${ruleName}Rule\`];
        }
        catch (_b) {
            ruleFn = require('graphql/validation')[\`\${ruleName}Rule\`];
        }
    }`,
        '    let ruleFn = allGraphQLJSRules[\`\${ruleName}Rule\`]',
      )
  );
});

await patch('/rules/match-document-filename.js', str => {
  return str
    .replace("import { existsSync } from 'fs'", commentLine)
    .replace('const isVirtualFile = !existsSync(filePath)', () => 'const isVirtualFile = false');
});
