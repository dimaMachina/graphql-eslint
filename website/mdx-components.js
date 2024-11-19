import { Callout } from '@theguild/components';
import {
  compileMdx,
  useMDXComponents as getDocsMDXComponents,
  MDXRemote,
} from '@theguild/components/server';

const user = 'dimaMachina';
const repo = 'graphql-eslint';
const branch = 'master';

const docsComponents = getDocsMDXComponents({
  async OfficialExampleCallout({ gitFolder }) {
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
  WIP() {
    return (
      <Callout type="warning" emoji="🚧">
        This page is under construction. Help us improve the content by submitting a PR.
      </Callout>
    );
  },
  async ESLintConfigs({ gitFolder }) {
    const docsPath = `examples/${gitFolder}/`;

    return (
      <MDXRemote
        compiledSource={await compileMdx(`
<OfficialExampleCallout gitFolder="${gitFolder}" />

## ESLint Flat Config
\`\`\`js filename="eslint.config.js"
${await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${docsPath}eslint.config.js`)
          .then(response => response.text())}
\`\`\`

## ESLint Legacy Config

> [!WARNING]
>
> An eslintrc configuration file, is deprecated and support will be removed in ESLint v10.0.0. Migrate to an [\`eslint.config.js\` file](#eslint-flat-config)

\`\`\`js filename=".eslintrc.cjs"
${await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${docsPath}.eslintrc.cjs`)
          .then(response => response.text())}
\`\`\``)}
      />
    );
  }
});


export const useMDXComponents = components => ({
  ...docsComponents,
  ...components,
});
