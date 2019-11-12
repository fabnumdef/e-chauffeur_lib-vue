import { ENTITY_PLURAL } from '../users';

export function generateUser(id) {
  return {
    id,
    name: 'Name',
  };
}
export default (mock) => {
  mock.onPost(`/${ENTITY_PLURAL}`).reply(200, generateUser('FOO'));
};
