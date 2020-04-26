import AbstractQuery from './abstract/query';

export default class FeedbackQuery extends AbstractQuery {
  static get baseEndpoint() {
    return '/feedback';
  }

  async send(data, options) {
    return this.constructor.axios.post(
      this.getEndpoint(),
      data,
      options,
    );
  }
}
