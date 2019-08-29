const { join } = require('path');
const merge = require('lodash.merge');
const lGet = require('lodash.get');
const pkg = require('./package.json');

const MODULE_BUILD_DIR = 'lib-eChauffeur';

module.exports = function injectModule({
  components = {}, api = {}, plugins = [], withAuth = false, authPlugins = [],
} = {}) {
  const { buildDir } = this.options;
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
    build: {
      parallel: true,
      transpile: ['@fabnumdef/e-chauffeur_lib-vue'],
    },
    loading: { color: '#fff' },
    auth: {
      strategies: {
        local: {
          endpoints: {
            login: { url: '/jwt/generate?mask=token', method: 'post', propertyName: 'token' },
            user: { url: '/jwt/user?mask=id,email,roles', method: 'get', propertyName: false },
            logout: null,
          },
        },
      },
      plugins: authPlugins
        .map(plugin => join(buildDir, MODULE_BUILD_DIR, 'plugins', `${plugin}.js`))
        .concat(lGet(this.options, 'auth.plugins', [])),
    },
    toast: {
      position: 'bottom-right',
      duration: 15000,
    },
    manifest: {
      lang: 'fr',
    },
  });

  if (withAuth) {
    this.requireModule('@nuxtjs/auth');
  }

  authPlugins.forEach((plugin) => {
    this.addTemplate({
      src: join(__dirname, 'plugins', `${plugin}.js`),
      fileName: join(MODULE_BUILD_DIR, 'plugins', `${plugin}.js`),
      options: {
        pkg,
      },
    });
  });

  this.addPlugin({
    src: join(__dirname, 'plugins', 'components.js'),
    options: {
      components,
      pkg,
    },
  });

  ['axios', 'luxon', 'socket', 'states'].concat(plugins).forEach((plugin) => {
    this.addPlugin({
      src: join(__dirname, 'plugins', `${plugin}.js`),
      options: {
        pkg,
      },
    });
  });

  this.addPlugin({
    src: join(__dirname, 'api', 'index.js'),
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
  this.requireModule(['nuxt-env', {
    keys: [
      'API_URL',
    ],
  }]);
};

module.exports.meta = require('./package.json');
