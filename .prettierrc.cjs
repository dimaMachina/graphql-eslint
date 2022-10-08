module.exports = {
  trailingComma: 'all',
  printWidth: 100,
  singleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.md',
      options: {
        semi: false,
        trailingComma: 'none',
      },
    },
  ],
};
