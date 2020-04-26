import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY = 'car';
export const ENTITY_PLURAL = 'cars';

export default class PoisQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
