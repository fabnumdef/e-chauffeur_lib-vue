import AbstractCRUDQuery from './crud-query';

export default class AbstractCampusCRUDQuery extends AbstractCRUDQuery {
  get campusRoutePrefix() {
    if (!this.campus) {
      return null;
    }
    return `/campuses/${encodeURIComponent(this.campus)}`;
  }

  getCampusEndpoint(...params) {
    return [this.campusRoutePrefix, this.constructor.getEndpoint(...params)].join('');
  }

  setCampus(campus) {
    this.campus = campus;
    return this;
  }
}
