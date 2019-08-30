import merge from 'lodash.merge';
import {RANGE} from "./helpers";

const ENTITY = 'log';
const ENTITY_PLURAL = 'logs';

export default axios => (mask) => {
  const filters = {};
  const params = {
    mask,
    filters,
  };
  return {
    async getLogs(offset = 0, limit = 30, search = null) {
      const response = await axios.get(
        `/${ENTITY_PLURAL}`,
        {
          params: merge(params, { search }),
          headers: {
            [RANGE]: `${ENTITY}=${offset}-${offset + limit - 1}`,
          },
        },
      );

      return response;
    },
  };
};
