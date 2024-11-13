import { createRequire } from 'node:module';
import path from 'node:path';
import webpack from 'webpack';
import { withGuildDocs } from '@theguild/components/next.config';

const require = createRequire(import.meta.url);

const sep = path.sep === '/' ? '/' : '\\\\';

const ALLOWED_SVG_REGEX = new RegExp(`src${sep}icons${sep}.+\\.svg$`);

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
      '@graphql-eslint/eslint-plugin': require
        .resolve('@graphql-eslint/eslint-plugin')
        .replace('cjs/index.js', 'index.browser.js'),

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

    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));
    fileLoaderRule.exclude = ALLOWED_SVG_REGEX;

    config.module.rules.push({
      test: ALLOWED_SVG_REGEX,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: ['removeXMLNS'],
            },
          },
        },
      ],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
