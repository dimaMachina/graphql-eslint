/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { defineConfig, FooterExtended } from '@theguild/components';

export default defineConfig({
  docsRepositoryBase: 'https://github.com/B2o5T/graphql-eslint/tree/master/website', // base URL for the docs repository
  // main({ children }) {
  //   const { resolvedTheme } = useTheme();
  //   const { route } = useRouter();
  //
  //   const comments = route !== '/' && (
  //     <Giscus
  //       // ensure giscus is reloaded when client side route is changed
  //       key={route}
  //       repo="kamilkisiela/graphql-config"
  //       repoId="MDEwOlJlcG9zaXRvcnk2NDQ3MDQzNg=="
  //       category="Docs Discussions"
  //       categoryId="DIC_kwDOA9e9pM4CSDVk"
  //       mapping="pathname"
  //       theme={resolvedTheme}
  //     />
  //   );
  //   return (
  //     <>
  //       {children}
  //       {comments}
  //     </>
  //   );
  // },
  footer: {
    component: function Footer() {
      const { route } = useRouter();
      return route === '/play' ? null : <FooterExtended />;
    },
  },
  logoLink: '/docs',
  siteName: 'ESLINT',
});
