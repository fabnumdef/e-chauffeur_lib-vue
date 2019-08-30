import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

const ENTITY = 'poi';
const ENTITY_PLURAL = 'pois';

export default axios => (campus, mask) => {
  const filters = {};
  if (campus) {
    filters.campus = campus.id;
  }
  const params = {
    mask,
    filters,
  };
  return {
    async getPois(offset = 0, limit = 30, search = null) {
      const response = await axios.get(
        `/${ENTITY_PLURAL}`,
        {
          params: merge(params, { search }),
          headers: {
            [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
          },
        },
      );

      response.pagination = computePagination(response)[ENTITY];

      return response;
    },

    getPoi(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },

    patchPoi(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    postPoi(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    deletePoi(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },
  };
};
