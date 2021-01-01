import router from '../../router/index';
import globalUrl from '../../globalFunctions/globalUrl';
import moduleFunctions from '../modules/moduleFunctions';

const state = {
  categoryTotals: {
    totalCodingTime: '--',
    totalActivetime: '--',
    totalPassiveTime: '--',
    totalCodingChallengesTime: '--',
  },
};

const getters = {
  getCategoryTotals: (state) => state.categoryTotals,
};

const mutations = {
  setCategoryTotals: (state, payload) => {
    const timeTotals =
      payload.active_time + payload.passive_time + payload.coding_problems_time;
    state.categoryTotals.totalCodingTime = moduleFunctions.convertNumberToTotalTime(
      timeTotals
    );
    state.categoryTotals.totalActiveTime = moduleFunctions.convertNumberToTotalTime(
      payload.active_time
    );
    state.categoryTotals.totalPassiveTime = moduleFunctions.convertNumberToTotalTime(
      payload.passive_time
    );
    state.categoryTotals.totalCodingChallengesTime = moduleFunctions.convertNumberToTotalTime(
      payload.coding_problems_time
    );
  },
};

const actions = {
  getCategoryTotals: async ({ rootState, commit }) => {
    try {
      const res = await fetch(
        `${globalUrl}analytics/totals/${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();
      console.log(jsonResponse);
      if (res.status == 200) {
        commit('setCategoryTotals', jsonResponse);
      } else {
        router.push('/forbidden');
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
