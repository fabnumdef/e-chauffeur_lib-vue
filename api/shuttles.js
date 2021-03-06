import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY_PLURAL = 'shuttles';
export const ENTITY = 'shuttle';

export default class ShuttleQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }

  setCampus(campus) {
    this.campus = campus;
    return this;
  }

  list(start, end, options = {}) {
    return super.list(options).setFilter('start', start).setFilter('end', end);
  }
}
