import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY_PLURAL = 'drivers';
export const ENTITY = 'user';

export default class DriversQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
