import AbstractQuery from './abstract/query';

export default class FormsQuery extends AbstractQuery {
  static get baseEndpoint() {
    return '/forms';
  }

  async contact(data, options = {}) {
    return this.constructor.axios.post(
      this.getEndpoint('contact'),
      data,
      options,
    );
  }
}
