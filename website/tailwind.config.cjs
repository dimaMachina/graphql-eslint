const tailwindConfig = require('@theguild/tailwind-config');

module.exports = {
  ...tailwindConfig,
  plugins: [require("tailwindcss-radix")()]
}
