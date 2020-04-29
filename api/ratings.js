import AbstractCRUDQuery from './abstract/crud-query';

const ENTITY = 'rating';
const ENTITY_PLURAL = 'ratings';

export default class RatingsQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
