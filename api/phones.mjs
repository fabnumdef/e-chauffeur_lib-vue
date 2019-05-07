import { computePagination } from './helpers';

const ENTITY = 'phone';
const ENTITY_PLURAL = 'phones';

export default axios => ({
  async getPhones(mask) {
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params: { mask },
        headers: {
          Range: `${ENTITY}=-10`,
        },
      },
    );

    response.pagination = computePagination(response)[ENTITY];

    return response;
  },

  async getPhone(id, mask) {
    return axios.get(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { mask },
      },
    );
  },

  postPhone(data, mask) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      data,
      {
        params: { mask },
      },
    );
  },

  patchPhone(id, data, mask) {
    return axios.patch(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      data,
      {
        params: { mask },
      },
    );
  },

  deletePhone(id) {
    return axios.delete(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },
});
