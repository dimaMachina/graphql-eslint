/* eslint sort-keys: error */
import { Callout, defineConfig, PRODUCTS } from '@theguild/components';

export default defineConfig({
  backgroundColor: {
    dark: '15,17,20',
    light: '250,250,250',
  },
  banner: {
    content: (
      <>
        🚧 This is WIP documentation for v4 of the plugin. For v3 click{' '}
        <a
          href="https://074c6ee9.graphql-eslint.pages.dev/docs"
          target="_blank"
          rel="noreferrer"
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="_text-primary-600 _underline _decoration-from-font [text-underline-position:from-font]"
        >
          here
        </a>
        .
      </>
    ),
    dismissible: false,
  },
  components: {
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
