/** @type {import('prettier').Config} */
module.exports = {
  bracketSpacing: true,
  printWidth: 80,
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  trailingComma: 'all',
  plugins: [
    'prettier-plugin-tailwindcss',
  ]
};
