import router from '../../router/index';

const state = {
  loggedInUser: {
    userId: null,
    firstName: null,
    lastName: null,
  },
};

const getters = {
  loggedInUser: (state) => state.loggedInUser,
  userId: (state) => state.loggedInUser.userId,
};

const mutations = {
  //runs when a user successfully logs in in SignIn.vue
  setUserCredentials(state, payload) {
    state.loggedInUser.userId = payload.userId;
    state.loggedInUser.firstName = payload.firstName;
    state.loggedInUser.lastName = payload.lastName;
  },
  clearUserCredentials(state) {
    state.loggedInUser.userId = null;
    state.loggedInUser.firstName = null;
    state.loggedInUser.lastName = null;
  },
};

const actions = {
  async signUp({ dispatch }, formData) {
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const jsonResponse = await res.json();

      console.log(jsonResponse);
      alert(jsonResponse.error);

      if (res.status == 201) {
        dispatch('signIn', {
          email: formData.email,
          password: formData.password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  async signIn({ commit }, formData) {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const jsonResponse = await res.json();
      console.log(jsonResponse);
      alert(jsonResponse.error);

      if (res.status == 200) {
        commit('setUserCredentials', jsonResponse);
        sessionStorage.setItem('user', JSON.stringify(jsonResponse));
        router.push({
          name: 'GridView',
          params: { id: state.loggedInUser.userId },
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  logout({ commit }) {
    try {
      commit('clearUserCredentials');
      document.cookie =
        'CodingTimeTrackerJwt=; expires=Thu, 18 Dec 2013 12:00:00 UTC;';
      sessionStorage.removeItem('user');
    } catch (err) {
      console.log(err);
    }
  },
  autoLogin({ commit }) {
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user);
    if (!user) {
      return;
    }
    commit('setUserCredentials', {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    console.log('User auto logged in');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
