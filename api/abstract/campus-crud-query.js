import AbstractCRUDQuery from './crud-query';

export default class AbstractCampusCRUDQuery extends AbstractCRUDQuery {
  static getEndpoint(...params) {
    if (this.campus) {
      return super.getEndpoint('campuses', this.campus, ...params);
    }
    return super.getEndpoint(...params);
  }

  setCampus(campus) {
    this.campus = campus;
    return this;
  }
}
