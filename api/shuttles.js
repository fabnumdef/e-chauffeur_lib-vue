import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

export const ENTITY_PLURAL = 'shuttles';
export const ENTITY = 'shuttle';

export default (axios) => (campus, mask) => {
  const filters = {};
  if (campus) {
    filters.campus = campus;
  }
  const params = {
    mask,
    filters,
  };

  return {
    async getShuttles(
      start,
      end,
      {
        format = null, offset = 0, limit = 30, csv = {},
      } = {},
      { filter = {} } = {},
    ) {
      const headers = {
        [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
      };
      const localParams = {
        mask: csv.mask || mask,
        filters: merge({}, filters, { start, end }, { ...filter }),
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

    async getShuttle(id, token) {
      return axios.get(
        `/${ENTITY_PLURAL}/${id}`,
        {
          params: {
            mask,
            token,
          },
        },
      );
    },

    async postShuttle(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus: { id: campus } }),
        {
          params,
        },
      );
    },

    async patchShuttle(id, data, step = {}) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        data,
        {
          params: { ...params, step },
        },
      );
    },

    deleteShuttle(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params: {
            ...params,
          },
        },
      );
    },
  };
};
