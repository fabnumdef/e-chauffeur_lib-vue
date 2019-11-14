import { computePagination, RANGE } from './helpers';

export const ENTITY = 'phone-model';
export const ENTITY_PLURAL = 'phone-models';

export default axios => ({
  async getPhoneModels(mask, { search = null } = {}, offset = 0, limit = 30) {
    const params = { mask };
    if (search) {
      params.search = search;
    }
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params,
        headers: {
          [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
        },
      },
    );

    response.pagination = computePagination(response)[ENTITY];

    return response;
  },

  getPhoneModel(id, mask) {
    return axios.get(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { mask },
      },
    );
  },

  patchPhoneModel(id, data, mask) {
    return axios.patch(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      data,
      {
        params: { mask },
      },
    );
  },

  postPhoneModel(data, mask) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      data,
      {
        params: { mask },
      },
    );
  },

  deletePhoneModel(id) {
    return axios.delete(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },
});
