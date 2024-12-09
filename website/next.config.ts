import { createRequire } from 'node:module';
import path from 'node:path';
import webpack from 'webpack';
import { withGuildDocs } from '@theguild/components/next.config';

const require = createRequire(import.meta.url);

export default withGuildDocs({
  cleanDistDir: true,
  output: 'export',
  redirects: async () =>
    Object.entries({
      '/': '/docs', // TODO: add landing page later
      '/docs/getting-started/parser': '/docs/usage',
      '/docs/getting-started': '/docs/usage',
      '/docs/getting-started/parser-options': '/docs/parser-options',
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: from !== '/',
    })),
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // fixes TypeError: esquery.parse is not a function in browser
      esquery: require.resolve('esquery'),
      // fixes for @eslint/eslintrc TypeError: __webpack_require__(...).pathToFileURL is not a function
      eslint: require.resolve('eslint').replace(/api\.js$/, `linter${path.sep}index.js`),
      '@graphql-eslint/eslint-plugin': require
        .resolve('@graphql-eslint/eslint-plugin')
        .replace(`cjs${path.sep}index.js`, 'browser.js'),

      // fixes Cannot use GraphQLNonNull "Boolean!" from another module or realm.
      'graphql/utilities/valueFromASTUntyped.js': require.resolve(
        'graphql/utilities/valueFromASTUntyped',
      ),
      'graphql/validation/index.js': require.resolve('graphql/validation'),
      'graphql/validation/validate.js': require.resolve('graphql/validation/validate'),
      graphql: require.resolve('graphql'),
    };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
        resource.request = resource.request.replace('node:', '');
      }),
    );

    // rule.exclude doesn't work starting from Next.js 15
    // @ts-expect-error -- fixme
    const { test: _test, ...imageLoaderOptions } = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /svgr/,
          use: ['@svgr/webpack'],
        },
        imageLoaderOptions,
      ],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
