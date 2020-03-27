import FilterableQuery from './filterable-query';

export default class LimitableQuery extends FilterableQuery {
  setOffset(offset) {
    this.offset = offset;
    return this;
  }

  setLimit(limit) {
    this.limit = limit;
    return this;
  }

  setSearchTerm(search) {
    this.search = search;
    return this;
  }
}
