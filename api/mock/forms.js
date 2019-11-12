import { ENTITY_PLURAL } from '../forms';

export default (mock) => {
  mock.onPost(`/${ENTITY_PLURAL}/contact`).reply(200);
};
