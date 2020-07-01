module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    allowImportExportEverywhere: true
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 1
  }
}
