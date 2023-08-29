const { plugins, ...prettierConfig } = require('@theguild/prettier-config');

module.exports = {
  ...prettierConfig,
  plugins: [...plugins, 'prettier-plugin-tailwindcss'],
};
