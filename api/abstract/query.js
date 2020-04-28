export default class AbstractQuery {
  static get baseEndpoint() {
    return '/';
  }

  getEndpoint(...params) {
    return [this.constructor.baseEndpoint, ...params.map((f) => encodeURIComponent(f))].join('/');
  }

  static setAxios(axios) {
    this.axios = axios;
    return this;
  }

  setMask(mask) {
    this.mask = Array.isArray(mask) ? mask.join(',') : mask;
    return this;
  }

  getMask() {
    return this.mask;
  }
}
