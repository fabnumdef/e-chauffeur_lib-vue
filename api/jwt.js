export const TOKEN_KEY = 'token';
export default axios => ({
  async getUser(mask) {
    return axios.get(
      '/jwt/user',
      {
        params: { mask },
      },
    );
  },

  async renewJWT() {
    const { data } = await axios.post(
      '/jwt/renew',
      {},
      {
        params: { mask: TOKEN_KEY },
      },
    );
    return data[TOKEN_KEY];
  },

  async getCampuses(mask) {
    return axios.get(
      '/jwt/user/campuses',
      {
        params: { mask },
      },
    );
  },
});
