import qs from 'qs';

export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-param-reassign
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'brackets' });
    if (app.$env && app.$env.API_URL) {
      // eslint-disable-next-line no-param-reassign
      config.baseURL = app.$env.API_URL;
    }
    return config;
  });
}
