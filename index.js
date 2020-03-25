const { join } = require('path');
const merge = require('lodash.merge');
const lGet = require('lodash.get');
const pkg = require('./package.json');

const MODULE_BUILD_DIR = 'lib-eChauffeur';

module.exports = function injectModule({
  api = {}, plugins = [], withAuth = false, authPlugins = [], mockAxios = false, accountRoute = 'account', prometheus = {},
} = {}) {
  const { buildDir, build } = this.options;
  const flavoredAuthPlugins = authPlugins.map(p => typeof p === 'string' ? {src: p} : p);
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
      extractCSS: true,
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
        .concat(flavoredAuthPlugins
          .map((plugin) => ({
            ...plugin,
            src: join(buildDir, MODULE_BUILD_DIR, 'plugins', `${plugin.src}.js`)
          }))),
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

  flavoredAuthPlugins.forEach(({src}) => {
    this.addTemplate({
      src: join(__dirname, 'plugins', `${src}.js`),
      fileName: join(MODULE_BUILD_DIR, 'plugins', `${src}.js`),
      options: {
        accountRoute,
        pkg,
      },
    });
  });

  ['socket'].forEach((plugin) => {
    this.addPlugin({
      src: join(__dirname, 'plugins', `${plugin}.js`),
      mode: 'client',
      options: {
        pkg,
      },
    });
  });

  ['axios', 'luxon', 'states'].concat(plugins).forEach((plugin) => {
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
      'VERSION',
    ],
  }]);
};

module.exports.meta = require('./package.json');
