import merge from 'lodash.merge';
import { computePagination, RANGE } from './abstract/helpers';
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
}

export const deprecated = (axios) => ({
  async getUsers(mask, {
    offset = 0,
    limit = 30,
    format = null,
    csv = {},
  } = {}) {
    const params = {
      mask: csv.mask || mask,
    };
    const headers = {
      [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
    };
    if (format) {
      headers.Accept = format;
      params.csv = csv;
    }
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params,
        headers,
      },
    );

    response.pagination = computePagination(response)[ENTITY];
    return response;
  },

  getUser(id, mask) {
    return axios.get(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { mask },
      },
    );
  },

  patchUser(id, data, mask, { sendToken = false } = {}) {
    return axios.patch(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      data,
      {
        params: { mask },
        headers: {
          'X-Send-Token': sendToken,
        },
      },
    );
  },

  postUser(data, mask, { sendToken = false } = {}) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      data,
      {
        params: { mask },
        headers: {
          'X-Send-Token': sendToken,
        },
      },
    );
  },

  postUsers(data, { sendToken = false, delimiter = ';', ignoreEmpty = true } = {}) {
    return axios.post(
      `/${ENTITY_PLURAL}/batch`,
      data,
      {
        params: { delimiter, ignoreEmpty },
        headers: {
          'X-Send-Token': sendToken,
        },
      },
    );
  },

  deleteUser(id) {
    return axios.delete(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },

  subscribeDevice(id, data, mask) {
    return axios.post(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}/subscribe-device`,
      data,
      {
        params: { mask },
      },
    );
  },
});
