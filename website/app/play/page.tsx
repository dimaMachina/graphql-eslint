import { FC, Suspense } from 'react';
import { clsx } from 'clsx';
import { Linter } from 'eslint';
import { parser } from '@graphql-eslint/eslint-plugin';
import { ClientPage } from './page.client';

export const metadata = {
  title: 'Playground',
};

function dedent(code: string) {
  return code
    .split('\n')
    .map(line => line.slice(2))
    .join('\n')
    .trimStart();
}

const DEFAULT_SCHEMA = dedent(/* GraphQL*/ `
  scalar DateTime

  type Post {
    id: ID!
    title: String
    createdAt: DateTime
    modifiedAt: DateTime
  }

  type Query {
    post: Post!
    posts: [Post!]
  }
`);

const DEFAULT_OPERATION = dedent(/* GraphQL */ `
  query {
    posts {
      id
      title
    }
  }
`);

const classes = {
  heading: clsx('font-medium mb-2'),
};

const PlayPage: FC = () => {
  return (
    <div
      className={clsx(
        'h-[calc(100dvh-var(--nextra-navbar-height))]',
        'flex bg-gradient-to-br from-fuchsia-200/60 via-pink-300/60 to-purple-300/60 max-md:min-w-[1280px] dark:from-pink-800/30 dark:via-fuchsia-900/30 dark:to-purple-800/30',
      )}
    >
      <Suspense fallback="Loading...">
        <ClientPage
          defaultOperation={DEFAULT_OPERATION}
          defaultSchema={DEFAULT_SCHEMA}
          headingClass={classes.heading}
        >
          <div>
            <h3 className={classes.heading}>VERSIONING</h3>
            <span className="flex justify-between text-sm">
              <span>ESLint</span>
              <span>{Linter.version}</span>
            </span>
            <span className="flex justify-between text-sm">
              <span>GraphQL-ESLint</span>
              <span>{parser.meta.version}</span>
            </span>
          </div>
        </ClientPage>
      </Suspense>
    </div>
  );
};

export default PlayPage;
