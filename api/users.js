import merge from 'lodash.merge';
import User from './model-query/user';
import AbstractCRUDQuery from './abstract/crud-query';

export const ENTITY = 'user';
export const ENTITY_PLURAL = 'users';

export default class UsersQuery extends AbstractCRUDQuery {
  static get baseEndpoint() {
    return `/${ENTITY_PLURAL}`;
  }

  create(data, options) {
    return new User(async ({ sendToken = false } = {}) => super.create(data, merge({
      headers: {
        'X-Send-Token': sendToken,
      },
    }, options)));
  }

  edit(id, data, options) {
    return new User(async ({ sendToken = false } = {}) => super.edit(id, data, merge({
      headers: {
        'X-Send-Token': sendToken,
      },
    }, options)));
  }

  subscribeDevice(id, data, options) {
    return this.constructor.axios.post(
      this.constructor.getEndpoint(id, 'subscribe-device'),
      data,
      merge({
        params: { mask: this.mask },
      }, options),
    );
  }
}
