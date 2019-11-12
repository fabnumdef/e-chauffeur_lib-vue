import { ACCEPT_RANGES, CONTENT_RANGE } from '../helpers';
import { ENTITY } from '../campuses';

function generateCampus(id) {
  return {
    id,
    name: 'Campus',
    phone: {
      everybody: '0123456789',
    },
    location: {
      coordinates: [
        -4.49948242820619,
        48.3797180442881,
      ],
      type: 'Point',
    },
  };
}
export default (mock) => {
  mock.onGet('/campuses').reply(200, [
    generateCampus('FOO'),
  ], {
    [ACCEPT_RANGES]: ENTITY,
    [CONTENT_RANGE]: `${ENTITY} 0-1/1#30`,
  });
  mock.onGet('/campuses/FOO').reply(200, generateCampus('FOO'));
};
