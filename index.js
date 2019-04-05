const { join } = require('path');
const pkg = require('./package.json');

module.exports = function injectModule({ components = {} } = {}) {
  this.requireModule('@nuxtjs/axios');
  this.addPlugin({
    src: join(__dirname, 'plugin.js'),
    options: {
      components,
      pkg,
    },
  });
  this.addPlugin({
    src: join(__dirname, 'plugins/axios.js'),
  });
};

module.exports.meta = require('./package.json');
