import merge from 'lodash.merge';
import { computePagination, RANGE } from './abstract/helpers';

export const ENTITY = 'car';
export const ENTITY_PLURAL = 'cars';

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
    async getCars({
      offset = 0,
      limit = 30,
      format = null,
      csv = {},
    } = {}) {
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

    getCar(id) {
      return axios.get(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },

    patchCar(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    postCar(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    postCars(data, localParams) {
      return axios.post(
        `/${ENTITY_PLURAL}/batch`,
        merge(data, { campus }),
        {
          params: { ...params, ...localParams },
        },
      );
    },

    deleteCar(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      );
    },
  };
};
