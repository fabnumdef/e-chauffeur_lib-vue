import { computePagination, RANGE } from './helpers';
import { ENTITY as ENTITY_USER } from './users';

export const ENTITY_PLURAL = 'users';
export const ENTITY_CAMPUSES = 'campuses';

export default (axios) => (campus, mask) => ({
  async getUsers({
    offset = 0,
    limit = 30,
    format = null,
    csv = {},
  }) {
    const params = { campus, mask };
    const headers = { [RANGE]: `${ENTITY_USER}=${offset}-${offset + limit - 1}` };
    if (format) {
      headers.Accept = format;
      params.csv = csv;
    }
    const response = await axios.get(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}`,
      {
        params,
        headers,
      },
    );

    response.pagination = computePagination(response)[ENTITY_USER];

    return response;
  },

  async getUser(id) {
    return axios.get(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { campus, mask },
      },
    );
  },

  postUser(data) {
    return axios.post(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/`,
      data,
      {
        params: { campus, mask },
      },
    );
  },

  postUsers(data, localParams) {
    return axios.post(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/batch`,
      data,
      {
        params: { campus, mask, ...localParams },
      },
    );
  },

  patchUser(id, data) {
    return axios.patch(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      data,
      {
        params: { mask },
      },
    );
  },

  deleteUser(id) {
    return axios.delete(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },
});
