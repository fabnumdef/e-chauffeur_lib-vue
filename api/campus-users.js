import { computePagination, RANGE } from './helpers';
import { ENTITY as ENTITY_USER } from './users';

export const ENTITY_PLURAL = 'users';
export const ENTITY_CAMPUSES = 'campuses';

export default axios => (campus, mask) => ({
  async getUsers(offset = 0, limit = 30) {
    const response = await axios.get(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}`,
      {
        params: { campus, mask },
        headers: {
          [RANGE]: `${ENTITY_USER}=${offset}-${offset + limit - 1}`,
        },
      },
    );

    response.pagination = computePagination(response)[ENTITY_USER];

    return response;
  },

  async getUser(id) {
    const response = await axios.get(
      `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { campus, mask },
      },
    );
    return response;
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
