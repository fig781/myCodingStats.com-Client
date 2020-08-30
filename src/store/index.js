import Vue from 'vue';
import Vuex from 'vuex';
import coreGridView from './modules/coreGridView';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coreGridView,
  },
});
