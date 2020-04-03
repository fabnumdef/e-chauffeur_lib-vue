import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

export const ENTITY = 'loop-pattern';
export const ENTITY_PLURAL = 'loop-patterns';

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
    async getLoopPatterns({
      offset = 0,
      limit = 30,
      format = null,
      csv = {},
    }) {
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
    async getLoopPattern(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },
    async patchLoopPattern(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },
    async postLoopPattern(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },
    async deleteLoopPattern(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      );
    },
  };
};
