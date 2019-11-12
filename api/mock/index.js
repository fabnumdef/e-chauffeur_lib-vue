import MockAdapter from 'axios-mock-adapter';
import campusesMock from './campuses';
import usersMock from './users';
import formsMock from './forms';

export default (axios) => {
  const mock = new MockAdapter(axios);
  campusesMock(mock);
  formsMock(mock);
  usersMock(mock);

  mock.onAny().reply((config) => console.log(config));
};
