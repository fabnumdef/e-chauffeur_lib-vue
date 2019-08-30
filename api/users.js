import { computePagination, RANGE } from './helpers';

export const ENTITY = 'user';
const ENTITY_PLURAL = 'users';

export default axios => ({
  async getUsers(mask, offset = 0, limit = 30) {
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params: { mask },
        headers: {
          [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
        },
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

  patchUser(id, data, mask, { sendToken = false }) {
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

  postUser(data, mask, { sendToken = false }) {
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

  deleteUser(id) {
    return axios.delete(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },
});
