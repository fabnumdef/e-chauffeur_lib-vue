import MockAdapter from 'axios-mock-adapter';
import campusesMock from './campuses';
import usersMock from './users';
import formsMock from './forms';
import jwtMock from './jwt';
import poisMock from './pois';

export default (axios) => {
  const mock = new MockAdapter(axios);
  campusesMock(mock);
  formsMock(mock);
  usersMock(mock);
  jwtMock(mock);
  poisMock(mock);

  mock.onAny().reply((config) => console.log(config));
};
