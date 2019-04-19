const { join } = require('path');
const merge = require('lodash.merge');
const pkg = require('./package.json');

module.exports = function injectModule({
  components = {}, api = {}, plugins = [], withAuth = false,
} = {}) {
  merge(this.options, {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    loading: { color: '#fff' },
    auth: {
      strategies: {
        local: {
          endpoints: {
            login: { url: '/jwt/generate?mask=token', method: 'post', propertyName: 'token' },
            user: { url: '/jwt/user?mask=id,email', method: 'get', propertyName: false },
            logout: null,
          },
        },
      },
    },
    toast: {
      position: 'bottom-right',
      duration: 15000,
    },
    manifest: {
      lang: 'fr',
    },
  });
  this.addPlugin({
    src: join(__dirname, 'plugins/components.js'),
    options: {
      components,
      pkg,
    },
  });

  ['axios', 'luxon', 'socket', 'states'].concat(plugins).forEach((plugin) => {
    this.addPlugin({
      src: join(__dirname, `plugins/${plugin}.js`),
      options: {
        pkg,
      },
    });
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
