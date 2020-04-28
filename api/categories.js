import AbstractCRUDQuery from './abstract/crud-query';

export const ENTITY = 'category';
export const ENTITY_PLURAL = 'categories';

export default class CategoriesQuery extends AbstractCRUDQuery {
  static get ENTITY() {
    return ENTITY;
  }

  static get ENTITY_PLURAL() {
    return ENTITY_PLURAL;
  }
}
