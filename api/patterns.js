import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

export const ENTITY = 'pattern';
export const ENTITY_PLURAL = 'patterns';

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
    async getPatterns({
      offset = 0,
      limit = 30,
      format = null,
    } = {}) {
      const headers = {
        [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
      };
      if (format) {
        headers.Accept = format;
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
    async getPattern(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },
    async patchPattern(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },
    async postPattern(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },
    async deletePattern(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      );
    },
  };
};
