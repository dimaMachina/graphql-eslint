import fs from 'node:fs/promises';
import path from 'node:path';
import { addBasePath } from 'next/dist/client/add-base-path';
import {
  compileMdx,
  useMDXComponents as getDocsMDXComponents,
  MDXRemote,
} from '@theguild/components/server';

const docsComponents = getDocsMDXComponents({
  async OfficialExampleCallout({ gitFolder }) {
    const user = 'dimaMachina';
    const repo = 'graphql-eslint';
    const branch = 'master';
    const docsPath = `examples/${gitFolder}/`;
    return (
      <MDXRemote
        compiledSource={await compileMdx(`
> [!NOTE]
>
> Check out
> [the official examples](https://github.com/${user}/${repo}/tree/${branch}/${docsPath})
> for
> [ESLint Flat Config](https://github.com/${user}/${repo}/blob/${branch}/${docsPath}eslint.config.js)
> or
> [ESLint Legacy Config](https://github.com/${user}/${repo}/blob/${branch}/${docsPath}/.eslintrc.cjs)
> .`)}
      />
    );
  },
  // WIP() {
  //   return (
  //     <Callout type="warning" emoji="🚧">
  //       This page is under construction. Help us improve the content by submitting a PR.
  //     </Callout>
  //   );
  // },
  async ESLintConfigs({ gitFolder, graphqlConfigFile = '' }) {
    const docsPath = path.join(process.cwd(), '..', 'examples', gitFolder);
    const { ext } = path.parse(graphqlConfigFile);
    const graphqlConfig =
      graphqlConfigFile &&
      `
## GraphQL Config

\`\`\`${ext.slice(1)} filename="${graphqlConfigFile}"
${(await fs.readFile(`${docsPath}/${graphqlConfigFile}`, 'utf8')).trim()}
\`\`\`
`;
    return (
      <MDXRemote
        compiledSource={await compileMdx(`
<OfficialExampleCallout gitFolder="${gitFolder}" />
${graphqlConfig}
## ESLint Flat Config
\`\`\`js filename="eslint.config.js"
${(await fs.readFile(`${docsPath}/eslint.config.js`, 'utf8')).trim()}
\`\`\`

## ESLint Legacy Config

> [!WARNING]
>
> An eslintrc configuration file, is deprecated and support will be removed in ESLint v10.0.0. Migrate to an [\`eslint.config.js\` file](#eslint-flat-config)

\`\`\`js filename=".eslintrc.cjs"
${(await fs.readFile(`${docsPath}/.eslintrc.cjs`, 'utf8')).trim()}
\`\`\``)}
      />
    );
  },
  async source({ src, type, ...props }) {
    if (!src) {
      throw new Error('Must provide `src` prop');
    }
    if (src.startsWith('/')) {
      const filePath = path.join(process.cwd(), 'public', src);
      try {
        await fs.access(filePath);
      } catch (error) {
        const relativePath = path.relative(process.cwd(), filePath);
        if ((error as any).code === 'ENOENT') {
          throw new Error(`File doesn't exist: ${relativePath}`);
        }
        throw new Error(`Error checking file: ${relativePath}`);
      }
    }

    let ext = path.extname(src).slice(1); // remove dot;
    if (ext === 'mov') {
      ext = 'quicktime';
    }
    return <source {...props} src={addBasePath(src)} type={type || `video/${ext}`} />;
  },
});

export const useMDXComponents: typeof getDocsMDXComponents = components => ({
  ...docsComponents,
  ...components,
});
