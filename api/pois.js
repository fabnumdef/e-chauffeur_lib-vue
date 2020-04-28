import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY = 'poi';
export const ENTITY_PLURAL = 'pois';

export default class PoisQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
