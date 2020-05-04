import merge from 'lodash.merge';
import { Interval, DateTime } from 'luxon';
import Ride from './model-query/ride';
import AbstractCRUDQuery from './abstract/crud-query';
import FilterableQuery from './abstract/filterable-query';

export const ENTITY_PLURAL = 'rides';
export const ENTITY = 'ride';

function injectAvailabilities(d) {
  const data = d;
  if (d.availabilities) {
    data.availabilities = d.availabilities
      .filter((r) => r.start && r.end)
      .map((a) => Interval.fromDateTimes(DateTime.fromISO(a.start), DateTime.fromISO(a.end)));
  }
  return data;
}

export default class RidesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }

  get campusRoutePrefix() {
    return this.campus ? `/campuses/${encodeURIComponent(this.campus)}` : null;
  }

  setCampus(campus) {
    this.campus = campus;
    return this;
  }

  list(start, end, options = {}) {
    return super.list(options).setFilter('start', start).setFilter('end', end);
  }

  get(id, options = {}) {
    return new Ride(async ({ token = false } = {}) => super.get(id, merge({
      params: {
        token,
      },
    }, options)));
  }

  getDriverPosition(id, options = {}) {
    return new Ride(async ({ token = false } = {}) => this.constructor.axios.get(
      this.getEndpoint(id, 'position'),
      merge({
        params: {
          mask: this.mask,
          token,
        },
      }, options),
    ));
  }

  async driversPositions() {
    return this.constructor.axios.get(
      `${this.campusRoutePrefix}/drivers-positions`,
      {
        params: {
          mask: this.mask,
        },
      },
    );
  }

  async mutate(id, action) {
    return this.constructor.axios.post(
      this.getEndpoint(id, action),
      {},
      {
        params: {
          mask: this.mask,
        },
      },
    );
  }

  getDriverRides(user, options = {}) {
    return new FilterableQuery(async ({ filters = {} } = {}) => this.constructor.axios.get(
      `${this.campusRoutePrefix}/drivers/${encodeURIComponent(user)}/rides`,
      merge({
        params: {
          mask: this.mask,
          filters,
        },
      }, options),
    ));
  }

  async stats(start, end, options = {}) {
    return this.constructor.axios.get(
      `${this.campusRoutePrefix || ''}/stats`,
      {
        params: {
          mask: this.mask,
          filters: {
            start,
            end,
            'time-scope': options.timeScope,
            'time-unit': options.timeUnit,
          },
        },
      },
    );
  }

  availableDrivers(start, end, options = {}) {
    return new FilterableQuery(async ({ filters = {} } = {}) => {
      const response = await this.constructor.axios.get(
        `${this.campusRoutePrefix || ''}/drivers`,
        merge({
          params: {
            mask: this.mask,
            filters: {
              start,
              end,
              ...filters,
            },
          },
        }, options),
      );
      response.data = response.data.map(injectAvailabilities);
      return response;
    });
  }

  async availableCars(start, end, options = {}) {
    const response = await this.constructor.axios.get(
      `${this.campusRoutePrefix || ''}/cars`,
      merge({
        params: {
          mask: this.mask,
          filters: {
            start,
            end,
          },
        },
      }, options),
    );
    response.data = response.data.map(injectAvailabilities);
    return response;
  }
}
