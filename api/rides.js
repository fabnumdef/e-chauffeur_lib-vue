import merge from 'lodash.merge';
import { computePagination } from './helpers';
import { ENTITY_PLURAL as CAMPUS_PLURAL } from './campuses';

export const ENTITY_PLURAL = 'rides';
export const ENTITY = 'ride';

export default axios => (campus, user, mask) => {
  const filters = {};
  if (campus) {
    filters.campus = campus;
  }
  const params = {
    mask,
    filters,
  };
  return {
    async getDriverRides(...status) {
      const response = await axios.get(
        `/${CAMPUS_PLURAL}/${campus}/drivers/${user}/rides`,
        {
          params: {
            mask,
            filters: merge({}, filters, { status }),
          },
          headers: {
            Range: `${ENTITY}=-10`,
          },
        },
      );

      response.pagination = computePagination(response)[ENTITY];

      return response;
    },

    async mutateRide(id, action) {
      return axios.post(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}/${action}`,
        {},
        {
          params,
        },
      );
    },
  };
};
