import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { Banner, PRODUCTS } from '@theguild/components';
import { getDefaultMetadata, GuildLayout } from '@theguild/components/server';
import { QueryParamProvider } from './query-params-provider';
import '@theguild/components/style.css';

const description =  PRODUCTS.ESLINT.title;
const websiteName = 'GraphQL-ESLint';

export const metadata = getDefaultMetadata({
  description,
  websiteName,
  productName: 'GUILD',
});

const Anchor: FC<ComponentPropsWithoutRef<'a'>> = ({ children, ...props }) => {
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

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <GuildLayout
      websiteName={websiteName}
      description={description}
      logo={<PRODUCTS.ESLINT.logo className="text-lg" />}
      headProps={{
        backgroundColor: {
          dark: 'rgb(15, 17, 20)',
          light: 'rgb(250, 250, 250)',
        },
      }}
      layoutProps={{
        banner: <Banner dismissible={false}>
          🚧 This is WIP documentation for v4 of the plugin. For v3 click{' '}
          <Anchor href="https://074c6ee9.graphql-eslint.pages.dev/docs">here</Anchor>.
        </Banner>,
        docsRepositoryBase:
          'https://github.com/dimaMachina/graphql-eslint/tree/master/website',
      }}
      navbarProps={{
        navLinks: [
          { children: 'Playground', href: '/play' },
          { children: 'Rules', href: '/rules' },
        ],
      }}
    >
      <QueryParamProvider>{children}</QueryParamProvider>
    </GuildLayout>
  );
};

export default RootLayout;
