import { computePagination, RANGE } from './abstract/helpers';

export const ENTITY = 'car-model';
export const ENTITY_PLURAL = 'car-models';

export default (axios) => ({
  async getCarModels(mask, {
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

  getCarModel(id, mask) {
    return axios.get(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      {
        params: { mask },
      },
    );
  },

  patchCarModel(id, data, mask) {
    return axios.patch(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      data,
      {
        params: { mask },
      },
    );
  },

  postCarModel(data, mask) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      data,
      {
        params: { mask },
      },
    );
  },

  postCarModels(data, params) {
    return axios.post(
      `/${ENTITY_PLURAL}/batch`,
      data,
      { params },
    );
  },

  deleteCarModel(id) {
    return axios.delete(
      `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
    );
  },
});
