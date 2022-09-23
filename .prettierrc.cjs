module.exports = {
  trailingComma: 'es5',
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
