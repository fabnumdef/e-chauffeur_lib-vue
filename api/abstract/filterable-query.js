import Thenable from './thenable';

export default class FilterableQuery extends Thenable {
  setFilters(filters) {
    this.filters = filters;
    return this;
  }

  setFilter(name, filter) {
    if (!this.filters) {
      this.filters = {};
    }
    this.filters[name] = filter;
    return this;
  }
}
