import { TOKEN_KEY } from '../jwt';
import { generateUser } from './users';

function generateToken() {
  return {
    [TOKEN_KEY]: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.LwimMJA3puF3ioGeS-tfczR3370GXBZMIL-bdpu4hOU',
  };
}
export default (mock) => {
  mock.onPost(/^\/jwt\/generate/).reply(200, generateToken());
  mock.onGet(/^\/jwt\/user/).reply(200, generateUser('ownUser'));
};
