import AbstractCampusCRUDQuery from './abstract/campus-crud-query';

export const ENTITY = 'phone';
export const ENTITY_PLURAL = 'phones';

export default class PhonesQuery extends AbstractCampusCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
