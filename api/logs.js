import merge from 'lodash.merge';
import LimitableQuery from './abstract/limitable-query';
import AbstractQuery from './abstract/query';

export const ENTITY = 'log';
export const ENTITY_PLURAL = 'logs';

export default class FeedbackQuery extends AbstractQuery {
  static get baseEndpoint() {
    return `/${ENTITY_PLURAL}`;
  }

  listDriversPositions(date, options = {}) {
    return new LimitableQuery(async ({
      filters,
    } = {}) => this.constructor.axios.get(
      this.constructor.getEndpoint('positions-history'),
      merge({
        params: {
          mask: this.mask,
          filters: { date, ...filters },
        },
      }, options),
    ));
  }
}
