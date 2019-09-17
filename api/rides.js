import merge from 'lodash.merge';
import { Interval, DateTime } from 'luxon';
import { computePagination, RANGE } from './helpers';
import { ENTITY_PLURAL as CAMPUS_PLURAL } from './campuses';

export const ENTITY_PLURAL = 'rides';
export const ENTITY = 'ride';

export default axios => (campus, mask) => {
  const filters = {};
  if (campus) {
    filters.campus = campus;
  }
  const params = {
    mask,
    filters,
  };
  return {
    async getDriverRides(user, ...status) {
      const response = await axios.get(
        `/${CAMPUS_PLURAL}/${campus}/drivers/${user}/rides`,
        {
          params: {
            mask,
            filters: merge({}, filters, { status }),
          },
        },
      );

      return response;
    },

    async mutateRide({ id }, action) {
      return axios.post(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}/${action}`,
        {},
        {
          params,
        },
      );
    },

    async getRides(start, end, {
      format = null, offset = 0, limit = 30, csv = {},
    } = {}) {
      const headers = {
        [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
      };
      const localParams = {
        mask: csv.mask || mask,
        filters: merge({}, filters, { start, end }),
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

    async getRide(id, token) {
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

    async postRide(data) {
      return axios.post(
        `/${ENTITY_PLURAL}`,
        merge(data, { campus: { id: campus } }),
        {
          params,
        },
      );
    },

    async patchRide(id, data) {
      return axios.patch(
        `/${ENTITY_PLURAL}/${encodeURIComponent(id)}`,
        data,
        {
          params,
        },
      );
    },

    async getAvailableDrivers(userMask, start, end) {
      const response = await axios.get(
        `/${CAMPUS_PLURAL}/${campus}/drivers`,
        {
          params: {
            mask: userMask,
            filters: {
              start,
              end,
            },
          },
        },
      );
      response.data = response.data.map((u) => {
        const user = u;
        if (u.availabilities) {
          user.availabilities = u.availabilities
            .filter(r => r.start && r.end)
            .map(a => Interval.fromDateTimes(DateTime.fromISO(a.start), DateTime.fromISO(a.end)));
        }
        return user;
      });
      return response;
    },

    async getDriversPositions(userMask) {
      return axios.get(
        `/${CAMPUS_PLURAL}/${campus}/drivers-positions`,
        {
          params: {
            mask: userMask,
          },
        },
      );
    },

    async getAvailableCars(carMask, start, end, sort) {
      const parameters = {
        mask: carMask,
        filters: {
          start,
          end,
        },
      };
      if (sort) {
        parameters.sort = sort;
      }
      const response = await axios.get(
        `/${CAMPUS_PLURAL}/${campus}/cars`,
        {
          params: parameters,
        },
      );
      response.data = response.data.map((c) => {
        const car = c;
        if (c.availabilities) {
          car.availabilities = c.availabilities
            .filter(r => r.s && r.e)
            .map(a => Interval.fromDateTimes(DateTime.fromISO(a.s), DateTime.fromISO(a.e)));
        }
        return car;
      });
      return response;
    },

    async getStats(queriedStats, start, end) {
      return axios.get(
        `/${CAMPUS_PLURAL}/${campus}/stats`,
        {
          params: {
            mask: typeof queriedStats === 'string' ? queriedStats : queriedStats.mask,
            filters: {
              start,
              end,
              'time-scope': typeof queriedStats === 'string' ? undefined : queriedStats.timeScope,
              'time-unit': typeof queriedStats === 'string' ? undefined : queriedStats.timeUnit,
            },
          },
        },
      );
    },

    async getDriverPosition(id, token) {
      try {
        return await axios.get(
          `/${ENTITY_PLURAL}/${id}/position`,
          {
            params: {
              mask: 'driver,date,position',
              token,
            },
          },
        );
      } catch (e) {
        return {};
      }
    },
  };
};
