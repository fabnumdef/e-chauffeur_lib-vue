import MockAdapter from 'axios-mock-adapter';

export default (axios) => {
  const mock = new MockAdapter(axios);
  mock.onAny().reply((config) => console.log(config));
};
