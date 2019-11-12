import { ENTITY_PLURAL } from '../users';

export function generateUser(id) {
  return {
    id,
    name: 'Name',
    gprd: new Date(),
  };
}
export default (mock) => {
  mock.onPost(`/${ENTITY_PLURAL}`).reply(200, generateUser('FOO'));
  mock.onPatch(new RegExp(`/${ENTITY_PLURAL}/.+`)).reply(200, generateUser('FOO'));
};
