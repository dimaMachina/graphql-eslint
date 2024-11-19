import { Callout } from '@theguild/components';
import {
  compileMdx,
  useMDXComponents as getDocsMDXComponents,
  MDXRemote,
} from '@theguild/components/server';

const docsComponents = getDocsMDXComponents({});

export const useMDXComponents = components => ({
  ...docsComponents,
  ...components,
  OfficialExampleCallout({ gitFolder }) {
    return (
      <Callout type="info">
        <strong>Note</strong>: Check out{' '}
        <a href={`https://github.com/dimaMachina/graphql-eslint/tree/master/examples/${gitFolder}`}>
          the official examples
        </a>{' '}
        for{' '}
        <a
          href={`https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/eslint.config.js`}
        >
          ESLint Flat Config
        </a>{' '}
        or{' '}
        <a
          href={`https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/.eslintrc.cjs`}
        >
          ESLint Legacy Config
        </a>
        .
      </Callout>
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
    const user = 'dimaMachina';
    const repo = 'graphql-eslint';
    const branch = 'master';
    const docsPath = `examples/${gitFolder}/`;

    return (
      <MDXRemote
        compiledSource={await compileMdx(`
## ESLint Flat Config
\`\`\`js filename="eslint.config.js"
${await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${docsPath}eslint.config.js`).then(response => response.text())}
\`\`\`

## ESLint Legacy Config

> [!WARNING]
>
> An eslintrc configuration file, is deprecated and support will be removed in ESLint v10.0.0. Migrate to an [\`eslint.config.js\` file](#eslint-flat-config)

\`\`\`js filename=".eslintrc.cjs"
${await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${docsPath}.eslintrc.cjs`).then(response => response.text())}
\`\`\`

> [!NOTE]
>
> Check out
> [the official examples](https://github.com/dimaMachina/graphql-eslint/tree/master/examples/${gitFolder})
> for
> [ESLint Flat Config](https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/eslint.config.js)
> or
> [ESLint Legacy Config](https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/.eslintrc.cjs)
> .`)}
      />
    );
  },
});
