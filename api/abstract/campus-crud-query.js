import AbstractCRUDQuery from './crud-query';

export default class AbstractCampusCRUDQuery extends AbstractCRUDQuery {
  get campusRoutePrefix() {
    return this.campus ? `/campuses/${encodeURIComponent(this.campus)}` : null;
  }

  getEndpoint(...params) {
    const base = [this.constructor.baseEndpoint, ...params.map((f) => encodeURIComponent(f))].join('/');
    if (!this.campus) {
      return base;
    }
    return [this.campusRoutePrefix, base].join('');
  }

  setCampus(campus) {
    this.campus = campus;
    return this;
  }
}
