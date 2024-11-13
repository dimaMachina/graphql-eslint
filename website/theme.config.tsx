/* eslint sort-keys: error */
import { ComponentProps } from 'react';
import { Callout, defineConfig, PRODUCTS } from '@theguild/components';

function Anchor({ children, ...props }: ComponentProps<'a'>) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="_text-primary-600 _underline _decoration-from-font [text-underline-position:from-font]"
      {...props}
    >
      {children}
    </a>
  );
}

export default defineConfig({
  backgroundColor: {
    dark: '15,17,20',
    light: '250,250,250',
  },
  banner: {
    content: (
      <>
        🚧 This is WIP documentation for v4 of the plugin. For v3 click{' '}
        <Anchor href="https://074c6ee9.graphql-eslint.pages.dev/docs">here</Anchor>.
      </>
    ),
    dismissible: false,
  },
  components: {
    // @ts-expect-error -- fixme
    OfficialExampleCallout({ gitFolder }: { gitFolder: string }) {
      return (
        <Callout type="info">
          <strong>Note</strong>: Check out{' '}
          <Anchor
            href={`https://github.com/dimaMachina/graphql-eslint/tree/master/examples/${gitFolder}`}
          >
            the official examples
          </Anchor>{' '}
          for{' '}
          <Anchor
            href={`https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/eslint.config.js`}
          >
            ESLint Flat Config
          </Anchor>
          or{' '}
          <Anchor
            href={`https://github.com/dimaMachina/graphql-eslint/blob/master/examples/${gitFolder}/.eslintrc.cjs`}
          >
            ESLint Legacy Config
          </Anchor>
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
  },
  description: PRODUCTS.ESLINT.title,
  docsRepositoryBase: 'https://github.com/B2o5T/graphql-eslint/tree/master/website', // base URL for the docs repository
  logo: <PRODUCTS.ESLINT.logo />,
  websiteName: 'GraphQL-ESLint',
});
