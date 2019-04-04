const { join } = require('path');
const pkg = require('./package.json');

module.exports = function injectModule({ components = {} } = {}) {
  this.addPlugin({
    src: join(__dirname, 'plugin.js'),
    options: {
      components,
      pkg,
    },
  });
};

module.exports.meta = require('./package.json');
