import { withGuildDocs } from '@theguild/components/next.config';

/** @type {import("next").Config} */
export default withGuildDocs({
  redirects: () =>
    Object.entries({}).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // ESLint throws an error in browser for below deps - Module not found: Can't resolve …
      fs: false,
      module: false,
    };

    return config;
  },
});
