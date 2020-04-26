import merge from 'lodash.merge';
import AbstractQuery from './abstract/query';

export const TOKEN_KEY = 'token';

export default class JWTQuery extends AbstractQuery {
  static get baseEndpoint() {
    return '/jwt';
  }

  async user(options) {
    return this.constructor.axios.get(
      this.getEndpoint('user'),
      merge({
        params: { mask: this.mask },
      }, options),
    );
  }

  async renew() {
    const { data } = await this.constructor.axios.post(
      this.getEndpoint('renew'),
      {},
      {
        params: { mask: TOKEN_KEY },
      },
    );
    return data[TOKEN_KEY];
  }

  async accessibleCampuses() {
    return this.constructor.axios.get(
      this.getEndpoint('user', 'campuses'),
      {
        params: { mask: this.mask },
      },
    );
  }
}
