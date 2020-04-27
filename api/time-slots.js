import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY = 'time-slot';
export const ENTITY_PLURAL = 'time-slots';
export default class TimeSlotsQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }

  list(after, before, options = {}) {
    return super.list(options)
      .setFilter('after', after)
      .setFilter('before', before);
  }

  listDrivers(...args) {
    return this.list(...args)
      .setFilter('cars', 'null');
  }

  listCars(...args) {
    return this.list(...args)
      .setFilter('drivers', 'null');
  }
}
