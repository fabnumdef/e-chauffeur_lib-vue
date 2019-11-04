export const ENTITY_PLURAL = 'forms';

export default axios => ({
  async postFormContact(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}/contact`,
      fields,
    );
  },
  async postRatingForm(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}/rating`,
      fields,
    );
  },
});
