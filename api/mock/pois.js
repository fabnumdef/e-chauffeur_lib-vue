import { ACCEPT_RANGES, CONTENT_RANGE } from '../helpers';
import { ENTITY } from '../pois';

export function generatePoi(id, data = {}) {
  return {
    id,
    label: 'Lavoir de Saint-Martin',
    location: {
      type: 'Point',
      coordinates: [-4.481348600000047, 48.394887],
    },
    ...data,
  };
}
export default (mock) => {
  mock.onGet('/pois').reply(200, [
    generatePoi('BSL/lavoir'),
    generatePoi('BSL/musee-marine', {
      label: 'Musée National de la Marine',
      location: {
        type: 'Point',
        coordinates: [-4.492946699999948, 48.3816481],
      },
    }),
    generatePoi('BSL/musee-beaux-arts', {
      label: 'Musée des Beaux-Arts de Brest',
      location: {
        type: 'Point',
        coordinates: [-4.49014109999996, 48.3850325],
      },
    }),
  ], {
    [ACCEPT_RANGES]: ENTITY,
    [CONTENT_RANGE]: `${ENTITY} 0-1/1#30`,
  });
  mock.onGet('/pois/FOO').reply(200, generatePoi('FOO'));
};
