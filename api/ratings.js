import { RANGE, computePagination } from './helpers';

const ENTITY = 'rating';
const ENTITY_PLURAL = 'ratings';

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
    async postRating(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        data,
        { params },
      );
    },

    async getRatings({
      offset = 0,
      limit = 30,
      search = null,
      format = null,
      csv = {},
    } = {}) {
      const localParams = {
        mask: csv.mask || mask,
        search,
      };
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
          params: { ...params, ...localParams },
          headers,
        },
      );

      response.pagination = computePagination(response)[ENTITY];
      return response;
    },

    async getRating(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        { params },
      );
    },
  };
};
