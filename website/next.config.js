import { withGuildDocs } from '@theguild/components/next.config';

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
      // fs: false,
      // module: false,
      // // Ignore deps from graphql-tag-pluck - Module not found: Can't resolve …
      // velocityjs: false,
      // 'dustjs-linkedin': false,
      // atpl: false,
      // liquor: false,
      // twig: false,
      // ejs: false,
      // eco: false,
      // jazz: false,
      // jqtpl: false,
      // hamljs: false,
      // hamlet: false,
      // whiskers: false,
      // 'haml-coffee': false,
      // 'hogan.js': false,
      // 'templayed': false,
      // 'handlebars': false,
      // 'underscore': false,
      // 'walrus': false,
      // mustache: false,
      // just: false,
      // '@vue/compiler-sfc': false,
      // ect: false,
      // mote: false,
      // toffee: false,
      // dot: false,
      // 'bracket-template': false,
      // ractive: false,
      // htmling: false,
      // 'babel-core': false,
      // twing: false,
      // squirrelly: false,
      // 'coffee-script': false,
      // 'teacup/lib/express': false,
      // marko: false,
      // slm: false,
      // vash: false,
      // plates: false,
    };

    return config;
  },
});
