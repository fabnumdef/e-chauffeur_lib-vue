export default axios => ({
  async postRating(fields) {
    return axios.post(
      '/ratings',
      fields,
    );
  },
  async getRatings() {
    return axios.get('/ratings');
  },
});
