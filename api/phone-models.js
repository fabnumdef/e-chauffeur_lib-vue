import AbstractCRUDQuery from './abstract/crud-query';

export const ENTITY = 'phone-model';
export const ENTITY_PLURAL = 'phone-models';

export default class CampusesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
