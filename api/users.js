import { computePagination } from './helpers';

const ENTITY = 'users';

export default axios => ({
  async getUsers(mask, offset = 0, limit = 30) {
    const response = await axios.get(
      `/${ENTITY}`,
      {
        params: { mask },
        headers: {
          Range: `user=${offset}-${offset + limit - 1}`,
        },
      },
    );

    response.pagination = computePagination(response).user;

    return response;
  },

  getUser(id, mask) {
    return axios.get(
      `/${ENTITY}/${encodeURIComponent(id)}`,
      {
        params: { mask },
      },
    );
  },

  patchUser(id, data, mask, { sendToken = false }) {
    return axios.patch(
      `/${ENTITY}/${encodeURIComponent(id)}`,
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
      `/${ENTITY}`,
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
      `/${ENTITY}/${encodeURIComponent(id)}`,
    );
  },
});
