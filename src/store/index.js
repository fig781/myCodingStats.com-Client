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
});
