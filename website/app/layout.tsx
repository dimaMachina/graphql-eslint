import { FC, ReactNode } from 'react';
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
        docsRepositoryBase:
          'https://github.com/the-guild-org/the-guild-website/tree/master/website',
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
