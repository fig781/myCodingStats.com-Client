import Vue from 'vue';
import Vuex from 'vuex';
import appGridView from './modules/appGridView';
import userAccounts from './modules/userAccounts';
import appSettings from './modules/appSettings';
import appAnalytics from './modules/appAnalytics';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appGridView,
    userAccounts,
    appSettings,
    appAnalytics,
  },

  //Global Things
  state: {
    todaysDate: {
      month: {
        name: '',
        number: 0,
      },
      date: 1,
      year: 0,
    },
  },
  mutations: {
    setTodaysDate: (state) => {
      const today = new Date();
      const monthFormat = new Intl.DateTimeFormat('en-US', {
        month: 'long',
      });
      //todaysDate
      state.todaysDate.month.number = today.getMonth();
      state.todaysDate.month.name = monthFormat.format(today);
      state.todaysDate.date = today.getDate();
      state.todaysDate.year = today.getFullYear();
    },
  },
});
