import { TOKEN_KEY } from '../jwt';
import { generateUser } from './users';

function generateToken(id) {
  return {
    [TOKEN_KEY]: id,
  };
}
export default (mock) => {
  mock.onPost(/^\/jwt\/generate/).reply(200, generateToken('FOO_TOKEN'));
  mock.onGet(/^\/jwt\/user/).reply(200, generateUser('ownUser'));
};
