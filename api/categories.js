import merge from 'lodash.merge';
import { computePagination, RANGE } from './abstract/helpers';

export const ENTITY = 'category';
export const ENTITY_PLURAL = 'categories';

export default (axios) => (mask) => {
  const filters = {};
  const params = {
    mask,
    filters,
  };
  return {
    async getCategories({
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

    postCategories(data, localParams) {
      return axios.post(
        `/${ENTITY_PLURAL}/batch`,
        data,
        {
          params: { ...params, ...localParams },
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
