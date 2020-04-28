import AbstractCRUDQuery from './crud-query';

export default class AbstractCampusCRUDQuery extends AbstractCRUDQuery {
  get campusRoutePrefix() {
    return this.campus ? `/campuses/${encodeURIComponent(this.campus)}` : null;
  }

  getEndpoint(...params) {
    const base = [this.constructor.baseEndpoint, ...params.map((f) => encodeURIComponent(f))].join('/');
    return this.campus ? [this.campusRoutePrefix, base].join('') : base;
  }

  setCampus(campus) {
    this.campus = campus;
    return this;
  }
}
