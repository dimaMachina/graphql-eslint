/* eslint sort-keys: error */
import { defineConfig, PRODUCTS } from '@theguild/components';

export default defineConfig({
  banner: {
    content: (
      <>
        This docs for version 4 of plugin. For version 3 click{' '}
        <a
          href="https://074c6ee9.graphql-eslint.pages.dev/docs"
          target="_blank"
          rel="noreferrer"
          className="_text-primary-600 _underline _decoration-from-font [text-underline-position:from-font]"
        >
          here
        </a>
        .
      </>
    ),
  },
  backgroundColor: {
    dark: '15,17,20',
    light: '250,250,250',
  },
  description: PRODUCTS.ESLINT.title,
  docsRepositoryBase: 'https://github.com/B2o5T/graphql-eslint/tree/master/website', // base URL for the docs repository
  logo: <PRODUCTS.ESLINT.logo className="w-9" />,
  websiteName: 'GraphQL-ESLint',
});
