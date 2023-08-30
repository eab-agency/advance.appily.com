module.exports = {
  printWidth: 100,
  parser: 'typescript',
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  importOrder: ['^components/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
