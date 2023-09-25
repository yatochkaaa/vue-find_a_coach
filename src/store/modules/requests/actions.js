import axios from 'axios';

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await axios.post(
      `https://vue-http-demo-66bc1-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      newRequest
    );

    try {
      const responseData = response.data;
      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId;
    } catch (e) {
      throw new Error(response.data.message || 'Failed to fetch!');
    }

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters['auth/userId'];
    const token = context.rootGetters['auth/token'];
    const response = await axios.get(
      `https://vue-http-demo-66bc1-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );

    try {
      const responseData = response.data;
      const requests = [];

      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requests.push(request);
      }

      context.commit('setRequests', requests);
    } catch (e) {
      throw new Error(response.data.message || 'Failed to fetch!');
    }
  },
};
