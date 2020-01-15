export const ENTITY = 'log';
export const ENTITY_PLURAL = 'logs';

export default (axios) => () => ({
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
