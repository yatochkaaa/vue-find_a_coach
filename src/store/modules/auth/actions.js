import axios from 'axios';

export default {
  async login(context, payload) {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvDNoCmio0JQDRJjnY3Dm5gr5Q1Bwj2Uc',
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );

    try {
      const responseData = response.data;
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
      console.log(responseData);
    } catch (error) {
      throw new Error(response.data.message);
    }
  },
  async signup(context, payload) {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvDNoCmio0JQDRJjnY3Dm5gr5Q1Bwj2Uc',
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );

    try {
      const responseData = response.data;
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    } catch (error) {
      throw new Error(response.data.message);
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
