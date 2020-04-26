import merge from 'lodash.merge';
import User from './model-query/user';
import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY = 'user';
export const ENTITY_PLURAL = 'users';

export default class UsersQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }

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
      this.getEndpoint(id, 'subscribe-device'),
      data,
      merge({
        params: { mask: this.mask },
      }, options),
    );
  }
}
