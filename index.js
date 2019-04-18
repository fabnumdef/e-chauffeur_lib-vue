const { join } = require('path');
const pkg = require('./package.json');

module.exports = function injectModule({ components = {}, api = [], withAuth = false } = {}) {
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

  if (withAuth) {
    this.addPlugin({
      src: join(__dirname, 'plugins/has-right.js'),
      options: {
        pkg,
      },
    });
  }

  this.addPlugin({
    src: join(__dirname, 'plugins/states.js'),
    options: {
      pkg,
    },
  });

  this.addPlugin({
    src: join(__dirname, 'plugins/socket.js'),
  });

  this.addPlugin({
    src: join(__dirname, 'api/index.js'),
    options: {
      api,
      pkg,
    },
  });

  if (withAuth) {
    this.requireModule('@nuxtjs/auth');
  }

  this.requireModule(['qonfucius-nuxt-bulma', { css: false, postcss: false }]);
  this.requireModule('qonfucius-nuxt-fontawesome');
  this.requireModule('@nuxtjs/pwa');
  this.requireModule('@nuxtjs/toast');
  this.requireModule('@nuxtjs/axios');
};

module.exports.meta = require('./package.json');
