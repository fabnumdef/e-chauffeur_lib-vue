import AbstractCRUDQuery from './abstract/crud-query';

export const ENTITY = 'car-model';
export const ENTITY_PLURAL = 'car-models';

export default class CampusesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
