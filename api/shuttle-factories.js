import AbstractCRUDQuery from './abstract/campus-crud-query';

export const ENTITY = 'shuttle-factory';
export const ENTITY_PLURAL = 'shuttle-factories';

export default class ShuttleFactoriesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
