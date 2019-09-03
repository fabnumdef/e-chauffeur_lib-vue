import merge from 'lodash.merge';
import { computePagination, RANGE } from './helpers';

const ENTITY = 'time-slot';
const ENTITY_PLURAL = 'time-slots';

export default axios => (mask = ',', campus = null) => {
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

    editTimeSlot(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        merge(data, { campus }),
        {
          params,
        },
      );
    },

    createTimeSlot(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus }),
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
