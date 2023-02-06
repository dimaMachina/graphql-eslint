/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { Anchor, defineConfig, FooterExtended, Header, Navbar } from '@theguild/components';

export default defineConfig({
  banner: {
    key: 'new-website',
    text: (
      <>
        🎉 Welcome to the new GraphQL-ESLint website. Try{' '}
        <Anchor href="/play" className="text-primary-600">
          new playground page →
        </Anchor>{' '}
      </>
    ),
  },
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
  navbar: {
    component: props => (
      <>
        <Header accentColor="#1cc8ee" />
        <Navbar {...props} />
      </>
    ),
  },
  siteName: 'ESLINT',
});
