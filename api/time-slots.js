import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

export const ENTITY = 'time-slot';
export const ENTITY_PLURAL = 'time-slots';

export default (axios) => (mask = ',', campus = null) => {
  const filters = {};
  if (campus) {
    filters.campus = campus;
  }
  const params = {
    mask,
    filters,
  };
  return {
    async getTimeSlotsBetween(after, before, offset = 0, limit = 30) {
      const response = await axios.get(
        `/${ENTITY_PLURAL}`,
        {
          params: {
            mask,
            filters: merge({}, filters, { after, before }),
          },
          headers: {
            [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
          },
        },
      );

      response.pagination = computePagination(response)[ENTITY];
      return response;
    },

    async getDriversTimeSlotsBetween(...args) {
      params.filters.cars = 'null';
      return this.getTimeSlotsBetween(...args);
    },

    async getCarsTimeSlotsBetween(...args) {
      params.filters.drivers = 'null';
      return this.getTimeSlotsBetween(...args);
    },

    editTimeSlot(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus: { id: campus } }),
        {
          params,
        },
      );
    },

    createTimeSlot(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus: { id: campus } }),
        {
          params,
        },
      );
    },

    deleteTimeSlot(id) {
      return axios.delete(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        {
          params,
        },
      );
    },
  };
};
