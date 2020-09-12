import Vue from 'vue';
import Vuex from 'vuex';
import coreGridView from './modules/coreGridView';
import userAccounts from './modules/userAccounts';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coreGridView,
    userAccounts,
  },
});
