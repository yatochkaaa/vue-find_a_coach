import axios from 'axios';

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvDNoCmio0JQDRJjnY3Dm5gr5Q1Bwj2Uc';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvDNoCmio0JQDRJjnY3Dm5gr5Q1Bwj2Uc';
    }
    const response = await axios.post(url, {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    });

    try {
      const responseData = response.data;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    } catch (error) {
      throw new Error(response.data.message);
    }
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null,
      });
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
