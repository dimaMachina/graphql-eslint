/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { defineConfig, FooterExtended, PRODUCTS } from '@theguild/components';

export default defineConfig({
  description: PRODUCTS.ESLINT.title,
  docsRepositoryBase: 'https://github.com/B2o5T/graphql-eslint/tree/master/website', // base URL for the docs repository
  footer: {
    component: function Footer() {
      const { route } = useRouter();
      return route === '/play' ? null : <FooterExtended />;
    },
  },
  logo: PRODUCTS.ESLINT.logo({ className: 'w-9' }),
  websiteName: 'GraphQL-ESLint',
});
