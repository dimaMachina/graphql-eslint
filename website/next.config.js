import { createRequire } from 'node:module';
import webpack from 'webpack';
import { withGuildDocs } from '@theguild/components/next.config';

const require = createRequire(import.meta.url);

/** @type {import("next").Config} */
export default withGuildDocs({
  output: 'export',
  redirects: () =>
    Object.entries({
      '/': '/docs', // TODO: add landing page later
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
      '@graphql-eslint/eslint-plugin/package.json': require.resolve(
        '@graphql-eslint/eslint-plugin/package.json',
      ),
      '@graphql-eslint/eslint-plugin': require
        .resolve('@graphql-eslint/eslint-plugin')
        .replace('cjs/index.js', 'index.browser.mjs'),
    };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
        resource.request = resource.request.replace('node:', '');
      }),
    );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
