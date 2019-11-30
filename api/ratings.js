import { RANGE, computePagination } from './helpers';

const ENTITY = 'rating';
const ENTITY_PLURAL = 'ratings';

export default (axios) => ({
  async postRating(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      fields,
    );
  },
  async getRatings(mask, {
    offset = 0,
    limit = 30,
    search = null,
    format = null,
    csv = {},
  } = {}) {
    const params = {
      mask: csv.mask || mask,
      search,
    };
    const headers = {
      [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
    };
    if (format) {
      headers.Accept = format;
      params.csv = csv;
    }
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params,
        headers,
      },
    );

    response.pagination = computePagination(response)[ENTITY];
    return response;
  },
});
