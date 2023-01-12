const { plugins, ...prettierConfig } = require('@theguild/prettier-config');

module.exports = {
  ...prettierConfig,
  plugins: [...plugins, require('prettier-plugin-tailwindcss')],
};
