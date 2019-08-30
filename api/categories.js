import { computePagination, RANGE } from './helpers';

const ENTITY = 'category';
const ENTITY_PLURAL = 'categories';

export default axios => (mask) => {
  const filters = {};
  const params = {
    mask,
    filters,
  };
  return {
    async getCategories(offset = 0, limit = 30) {
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

    getCategory(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },

    patchCategory(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        data,
        {
          params,
        },
      );
    },

    postCategory(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        data,
        {
          params,
        },
      );
    },

    deleteCategory(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      );
    },
  };
};
