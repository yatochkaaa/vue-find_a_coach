import axios from 'axios';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters['auth/userId'];
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters['auth/token'];

    const response = await axios.put(
      `https://vue-http-demo-66bc1-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      coachData
    );

    try {
      context.commit('registerCoach', { ...coachData, id: userId });
    } catch (e) {
      throw new Error(response.data.message || 'Failed to fetch!');
    }
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await axios.get(
      'https://vue-http-demo-66bc1-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    );

    try {
      const responseData = response.data;
      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    } catch (e) {
      throw new Error(response.data.message || 'Failed to fetch!');
    }
  },
};
