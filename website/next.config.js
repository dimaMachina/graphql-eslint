import { createRequire } from 'node:module';
import { withGuildDocs } from '@theguild/components/next.config';

const require = createRequire(import.meta.url);

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
      // fixes TypeError: esquery.parse is not a function in browser
      esquery: require.resolve('esquery'),
      // fixes for @eslint/eslintrc TypeError: __webpack_require__(...).pathToFileURL is not a function
      eslint: require.resolve('eslint').replace('lib/api.js', 'lib/linter/index.js'),
      // fixes for processor.js Module not found: Can't resolve 'velocityjs' and other 36 modules
      '@graphql-tools/graphql-tag-pluck': false,
      '@graphql-tools/code-file-loader': false,
      // fixes for graphql-config.js TypeError: (0 , module__WEBPACK_IMPORTED_MODULE_0__.createRequire) is not a function
      'graphql-config': false,
      // fixes for schema.js and documents.js TypeError: Cannot read properties of undefined (reading 'split')
      'fast-glob': false,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
});
