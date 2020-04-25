import merge from 'lodash.merge';
import { computePagination, RANGE, ACCEPT } from './helpers';
import AbstractQuery from './query';
import LimitableQuery from './limitable-query';
import FilterableQuery from './filterable-query';

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
      format,
      csv,
    } = {}) => {
      const headers = {
        [RANGE]: `${this.constructor.ENTITY}=${offset}-${offset + limit - 1}`,
      };
      if (format) {
        headers[ACCEPT] = format;
      }
      const response = await this.constructor.axios.get(
        this.constructor.getEndpoint(),
        merge({
          params: {
            mask: this.mask,
            search,
            filters,
            csv,
          },
          headers,
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

  async batch(data, options = {}) {
    return this.constructor.axios.post(
      this.constructor.getEndpoint('batch'),
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

  get(id, options = {}) {
    return new FilterableQuery(async ({
      filters = {},
    } = {}) => this.constructor.axios.get(
      this.constructor.getEndpoint(id),
      merge({
        params: {
          mask: this.mask,
          filters,
        },
      }, options),
    ));
  }

  async delete(id) {
    return this.constructor.axios.delete(
      this.constructor.getEndpoint(id),
    );
  }
}
