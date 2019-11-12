import MockAdapter from 'axios-mock-adapter';
import campusesMock from './campuses';

export default (axios) => {
  const mock = new MockAdapter(axios);
  campusesMock(mock);

  mock.onAny().reply((config) => console.log(config));
};
