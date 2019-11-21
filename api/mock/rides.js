import { ENTITY_PLURAL } from '../rides';
import { generatePoi } from './pois';

export function generateRide(id) {
  return {
    id,
    start: new Date(),
    end: new Date(Date.now() + 1000 * 3600),
    departure: generatePoi('DEPARTURE'),
    arrival: generatePoi('ARRIVAL'),
    passengersCount: 1,
  };
}
export default (mock) => {
  mock.onPost(`/${ENTITY_PLURAL}`).reply(200, generateRide('FOO'));
  mock.onPatch(new RegExp(`/${ENTITY_PLURAL}/.+`)).reply(200, generateRide('FOO'));
  mock.onGet(new RegExp(`/${ENTITY_PLURAL}/.+`)).reply(200, generateRide('FOO'));
};
