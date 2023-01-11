// import { createRequire } from 'node:module';
import { withGuildDocs } from '@theguild/components/next.config';

// const require = createRequire(import.meta.url);

/** @type {import("next").Config} */
export default withGuildDocs({
  redirects: () =>
    Object.entries({
      '/': '/docs', // TODO: add landing page latter
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: false, // TODO: set to true
    })),
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      // ESLint throws an error in browser for below deps - Module not found: Can't resolve …
      fs: false,
      module: false,
    };

    return config;
  },
});
