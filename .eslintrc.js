const package = require('./package.json');
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  plugins: [
    'vue',
  ],
  ignorePatterns: ['api/mock', 'api/index.js', 'index.js', 'plugins/components.js'],
  rules: {
    'max-len': ['error', { code: 120 }],
    'no-alert': 0,
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'import/no-unresolved': ['error', { ignore: Object.keys(package.peerDependencies) }],
  },
};
