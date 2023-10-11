/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { defineConfig, FooterExtended } from '@theguild/components';

export default defineConfig({
  docsRepositoryBase: 'https://github.com/B2o5T/graphql-eslint/tree/master/website', // base URL for the docs repository
  footer: {
    component: function Footer() {
      const { route } = useRouter();
      return route === '/play' ? null : <FooterExtended />;
    },
  },
  logoLink: '/docs',
  siteName: 'ESLINT',
});
