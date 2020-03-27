import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';
import AbstractQuery from './query';
import LimitableQuery from './limitable-query';

export default class AbstractCRUDQuery extends AbstractQuery {
  static get ENTITY() {
    return null;
  }

  static get ENTITY_PLURAL() {
    return null;
  }

  static get baseEndpoint() {
    return `/${this.ENTITY_PLURAL}`;
  }

  list(options = {}) {
    return new LimitableQuery(async ({
      search, filters, limit = 30, offset = 0,
    } = {}) => {
      const response = await this.constructor.axios.get(
        this.constructor.getEndpoint(),
        merge({
          params: {
            mask: this.mask,
            search,
            filters,
          },
          headers: {
            [RANGE]: `${this.constructor.ENTITY}=${offset}-${offset + limit - 1}`,
          },
        }, options),
      );
      response.pagination = computePagination(response)[this.constructor.ENTITY];
      return response;
    });
  }

  async create(data, options = {}) {
    return this.constructor.axios.post(
      this.constructor.getEndpoint(),
      data,
      merge({
        params: {
          mask: this.mask,
        },
      }, options),
    );
  }

  async edit(id, data, options = {}) {
    return this.constructor.axios.patch(
      this.constructor.getEndpoint(id),
      data,
      merge({
        params: {
          mask: this.mask,
        },
      }, options),
    );
  }

  async get(id) {
    return this.constructor.axios.get(
      this.constructor.getEndpoint(id),
      {
        params: {
          mask: this.mask,
        },
      },
    );
  }

  async delete(id) {
    return this.constructor.axios.delete(
      this.constructor.getEndpoint(id),
    );
  }
}
