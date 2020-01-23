const { join } = require('path');
const merge = require('lodash.merge');
const lGet = require('lodash.get');
const pkg = require('./package.json');

const MODULE_BUILD_DIR = 'lib-eChauffeur';

module.exports = function injectModule({
  components = {}, api = {}, plugins = [], withAuth = false, authPlugins = [], mockAxios = false, accountRoute = 'account', prometheus = {},
} = {}) {
  const { buildDir, build } = this.options;
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
    },
    loading: { color: '#fff' },
    auth: {
      strategies: {
        local: {
          endpoints: {
            login: { url: '/jwt/generate?mask=token', method: 'post', propertyName: 'token' },
            user: { url: '/jwt/user?mask=id,email,roles,passwordExpiration', method: 'get', propertyName: false },
            logout: null,
          },
        },
      },
      plugins: lGet(this.options, 'auth.plugins', [])
        .concat(authPlugins
          .map((plugin) => join(buildDir, MODULE_BUILD_DIR, 'plugins', `${plugin}.js`))),
    },
    toast: {
      position: 'bottom-right',
      duration: 15000,
    },
    manifest: {
      lang: 'fr',
    },
  });

  this.options.build.transpile = build.transpile.concat(['@fabnumdef/e-chauffeur_lib-vue']);

  if (withAuth) {
    this.requireModule('@nuxtjs/auth');
  }

  this.requireModule(['@qonfucius/nuxt-prometheus-module', prometheus]);

  authPlugins.forEach((plugin) => {
    this.addTemplate({
      src: join(__dirname, 'plugins', `${plugin}.js`),
      fileName: join(MODULE_BUILD_DIR, 'plugins', `${plugin}.js`),
      options: {
        accountRoute,
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
      mocked: mockAxios,
      pkg,
    },
  });

  this.addServerMiddleware(join(__dirname, 'server-middlewares', 'x-frame.js'));

  this.requireModule(['qonfucius-nuxt-bulma', { css: false, postcss: false }]);
  this.requireModule('qonfucius-nuxt-fontawesome');
  this.requireModule('@nuxtjs/pwa');
  this.requireModule('@nuxtjs/toast');
  this.requireModule('@nuxtjs/axios');
  this.requireModule(['nuxt-env', {
    keys: [
      'API_URL',
      'VAPID_PUBLIC_KEY',
    ],
  }]);
};

module.exports.meta = require('./package.json');
