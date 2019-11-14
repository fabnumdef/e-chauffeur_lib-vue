import { RANGE } from './helpers';

export const ENTITY = 'log';
export const ENTITY_PLURAL = 'logs';

export default axios => mask => ({
  async getLogs(offset = 0, limit = 30, search = null) {
    return axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params: { search, mask },
        headers: {
          [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
        },
      },
    );
  },

  async getDriversPositionsHistory(date, positionMask, campus) {
    const filters = { date };
    if (campus) {
      filters.campus = campus;
    }
    return axios.get(
      `/${ENTITY_PLURAL}/positions-history`,
      {
        params: {
          mask: positionMask,
          filters,
        },
      },
    );
  },
});
