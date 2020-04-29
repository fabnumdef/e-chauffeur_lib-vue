import AbstractCRUDQuery from './abstract/crud-query';

export const ENTITY = 'campus';
export const ENTITY_PLURAL = 'campuses';

export default class CampusesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
