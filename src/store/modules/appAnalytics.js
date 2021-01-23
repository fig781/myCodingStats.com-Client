import globalUrl from '../../globalFunctions/globalUrl';
import moduleFunctions from '../modules/moduleFunctions';

const state = {
  analyticsYear: 0,
  analyticsMonth: {
    name: 'yeet',
    number: 0,
  },
  categoryTotals: {
    totalCodingTime: '--',
    totalActivetime: '--',
    totalPassiveTime: '--',
    totalCodingChallengesTime: '--',
  },
  tagTotals: [],
  projectTotals: [],
};

const getters = {
  getAnalyticsYear: (state) => state.analyticsYear,
  getAnalyticsMonth: (state) => state.analyticsMonth,
  getCategoryTotals: (state) => state.categoryTotals,
  getTagTotals: (state) => state.tagTotals,
  getProjectTotals: (state) => state.projectTotals,
};

const mutations = {
  setInitialAnalyticsMonthYear: (state, payload) => {
    //payload = rootState
    state.analyticsYear = payload.todaysDate.year;
    state.analyticsMonth = payload.todaysDate.month;
  },
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
  setTagTotals: (state, payload) => {
    let totalTime = 0;
    for (let x = 0; x < payload.length; x++) {
      totalTime += Number(payload[x].total);
    }
    for (let y = 0; y < payload.length; y++) {
      payload[y].percentage = moduleFunctions.findPercentageOfTotal(
        totalTime,
        payload[y].total
      );
      payload[y].total = moduleFunctions.convertNumberToTime(payload[y].total);
    }
    state.tagTotals = payload;
  },
  setProjectTotals: (state, payload) => {
    let totalTime = 0;
    for (let x = 0; x < payload.length; x++) {
      totalTime += Number(payload[x].total);
    }
    for (let y = 0; y < payload.length; y++) {
      payload[y].percentage = moduleFunctions.findPercentageOfTotal(
        totalTime,
        payload[y].total
      );
      payload[y].total = moduleFunctions.convertNumberToTime(payload[y].total);
    }
    state.projectTotals = payload;
  },
};

const actions = {
  actionSetInitialAnalyticsMonthYear: ({ rootState, commit }) => {
    commit('setInitialAnalyticsMonthYear', rootState);
  },
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
      if (res.status == 200) {
        commit('setCategoryTotals', jsonResponse);
      } else {
        console.log('getCategoryTotals error');
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  },
  getTagTotals: async ({ rootState, commit }) => {
    try {
      const res = await fetch(
        `${globalUrl}analytics/tagtotals/${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();
      if (res.status == 200) {
        commit('setTagTotals', jsonResponse);
      } else {
        console.log('getTagTotals error');
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  },
  getProjectTotals: async ({ rootState, commit }) => {
    try {
      const res = await fetch(
        `${globalUrl}analytics/projecttotals/${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();
      if (res.status == 200) {
        commit('setProjectTotals', jsonResponse);
      } else {
        console.log('getProjectTotals error');
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  },

  getChartValues: async ({ rootState }, date) => {
    try {
      const res = await fetch(
        `${globalUrl}analytics/chart/?date=${date}&userid=${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();
      if (res.status == 200) {
        return jsonResponse;
      } else {
        console.log('err');
      }
    } catch (err) {
      console.log(err);
    }
  },

  compileChartValues: async ({ dispatch }) => {
    let monthNumber = state.analyticsMonth.number + 1;
    if (monthNumber < 10) {
      monthNumber = '0' + monthNumber.toString();
    }
    const yearAndMonth = `${state.analyticsYear}-${monthNumber}`;
    const fetchedChartValues = await dispatch('getChartValues', yearAndMonth);
    console.log(fetchedChartValues);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
