import axios from 'axios';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await axios.put(
      `https://vue-http-demo-66bc1-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      coachData
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context) {
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
    } catch (e) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  },
};
