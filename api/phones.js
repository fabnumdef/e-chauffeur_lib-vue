import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

export const ENTITY = 'phone';
export const ENTITY_PLURAL = 'phones';

export default (axios) => (campus, mask) => {
  const filters = {};
  if (campus) {
    filters.campus = campus.id;
  }
  const params = {
    mask,
    filters,
  };
  return {
    async getPhones({
      offset = 0,
      limit = 30,
      search = null,
      format = null,
      csv = {},
    } = {}) {
      const localParams = merge(params, { search });
      const headers = {
        [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
      };
      if (format) {
        headers.Accept = format;
        localParams.csv = csv;
      }
      const response = await axios.get(
        `/${ENTITY_PLURAL}`,
        {
          params: localParams,
          headers,
        },
      );

      response.pagination = computePagination(response)[ENTITY];

      return response;
    },

    async getPhone(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },

    postPhone(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    postPhones(data, localParams) {
      return axios.post(
        `/${ENTITY_PLURAL}/batch`,
        merge(data, { campus }),
        {
          params: { ...params, ...localParams },
        },
      );
    },

    patchPhone(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    deletePhone(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },
  };
};
