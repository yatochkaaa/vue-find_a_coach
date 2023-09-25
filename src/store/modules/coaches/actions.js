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
};
