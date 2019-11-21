import { RANGE, computePagination } from './helpers';

const ENTITY = 'rating';
const ENTITY_PLURAL = 'ratings';

export default axios => mask => ({
  async postRating(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}`,
      fields,
    );
  },
  async getRatings(offset = 0, limit = 30, search = null) {
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params: { search, mask },
        headers: {
          [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
        },
      },
    );

    response.pagination = computePagination(response)[ENTITY];
    return response;
  },
});
