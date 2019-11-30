import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';
import { ENTITY as ENTITY_USER } from './users';
import { ENTITY } from './phones';

export const ENTITY_PLURAL = 'drivers';
export const ENTITY_CAMPUSES = 'campuses';

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
    async getDrivers({
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
        `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}`,
        {
          params,
          headers,
        },
      );

      response.pagination = computePagination(response)[ENTITY_USER];
      return response;
    },

    async getDriver(id) {
      const response = await axios.get(
        `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params: { campus, mask },
        },
      );
      return response;
    },

    postDriver(data) {
      return axios.post(
        `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/`,
        data,
        {
          params: { campus, mask },
        },
      );
    },

    patchDriver(id, data) {
      return axios.patch(
        `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        data,
        {
          params: { mask },
        },
      );
    },

    deleteDriver(id) {
      return axios.delete(
        `/${ENTITY_CAMPUSES}/${campus}/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
      );
    },
  };
};
