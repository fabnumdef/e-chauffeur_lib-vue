export default class AbstractQuery {
  static get baseEndpoint() {
    return '/';
  }

  static getEndpoint(...params) {
    return [this.baseEndpoint, ...params.map((f) => encodeURIComponent(f))].join('/');
  }

  static setAxios(axios) {
    this.axios = axios;
    return this;
  }

  setMask(mask) {
    if (Array.isArray(mask)) {
      this.mask = mask.join(',');
      return this;
    }
    this.mask = mask;
    return this;
  }
}
