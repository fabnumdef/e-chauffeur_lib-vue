const { join } = require('path');
const pkg = require('./package.json');

module.exports = function injectModule({ components = {}, api = [] } = {}) {
  this.addPlugin({
    src: join(__dirname, 'plugins/components.js'),
    options: {
      components,
      pkg,
    },
  });

  this.addPlugin({
    src: join(__dirname, 'plugins/axios.js'),
  });

  this.addPlugin({
    src: join(__dirname, 'plugins/luxon.js'),
  });

  this.addPlugin({
    src: join(__dirname, 'plugins/states.js'),
  });

  this.addPlugin({
    src: join(__dirname, 'api/index.js'),
    options: {
      api,
      pkg,
    },
  });

  this.requireModule(['qonfucius-nuxt-bulma', { css: false, postcss: false }]);
  this.requireModule('qonfucius-nuxt-fontawesome');
  this.requireModule('@nuxtjs/pwa');
  this.requireModule('@nuxtjs/toast');
  this.requireModule('@nuxtjs/axios');
};

module.exports.meta = require('./package.json');
