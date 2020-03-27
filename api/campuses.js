import { computePagination, RANGE } from './abstract/helpers';
import AbstractCRUDQuery from './abstract/crud-query';

export const ENTITY = 'campus';
export const ENTITY_PLURAL = 'campuses';

export default class CampusesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}

export const deprecated = (axios) => ({
  async getCampuses(mask, {
    search = null,
    offset = 0,
    limit = 30,
    format = null,
    csv = {},
  } = {}) {
    const params = {
      mask: csv.mask || mask,
      search,
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
  async getCampus(id, mask) {
    const response = await axios.get(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { mask },
      },
    );
    if (response.data) {
      response.data = { phone: {}, ...response.data };
    }
    return response;
  },
  patchCampus(id, data, mask) {
    return axios.patch(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      data,
      {
        params: { mask },
      },
    );
  },

  postCampus(data, mask) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      data,
      {
        params: { mask },
      },
    );
  },

  deleteCampus(id) {
    return axios.delete(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },
});
