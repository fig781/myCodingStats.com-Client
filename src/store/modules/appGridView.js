import router from '../../router/index';
import moduleFunctions from './moduleFunctions';

import globalUrl from '../../globalFunctions/globalUrl';

const state = {
  year: 0,
  month: {
    name: '',
    number: 0,
  },
  //date needs to have year, month, date
  todaysDate: {
    month: {
      name: '',
      number: 0,
    },
    date: 1,
    year: 0,
  },
  calendar: [],
  monthTotals: {
    monthTime: '0:00',
    activeTime: '0:00',
    passiveTime: '0:00',
    codingChallengesTime: '0:00',
    mainProject: '--',
    mainTag: '--',
  },
};

const getters = {
  year: (state) => state.year,
  month: (state) => state.month,
  calendar: (state) => state.calendar,
  monthTotals: (state) => state.monthTotals,
};

const mutations = {
  clearCalendar: (state) => {
    state.calendar = [];
  },
  setTodaysDateMonthYear: (state) => {
    const today = new Date();
    const monthFormat = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    });
    //todaysDate
    state.todaysDate.month.number = today.getMonth();
    state.todaysDate.month.name = monthFormat.format(today);
    state.todaysDate.date = today.getDate();
    state.todaysDate.year = today.getFullYear();

    //year
    state.year = today.getFullYear();

    //month
    state.month.number = today.getMonth();
    state.month.name = monthFormat.format(today);
  },

  decreaseMonthAndYear: (state) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    if (state.month.number === 0) {
      state.month.number = 11;
      state.month.name = months[state.month.number];
      state.year--;
    } else {
      state.month.number--;
      state.month.name = months[state.month.number];
    }
  },
  increaseMonthAndYear: (state) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    if (state.month.number === 11) {
      state.month.number = 0;
      state.month.name = months[state.month.number];
      state.year++;
    } else {
      state.month.number++;
      state.month.name = months[state.month.number];
    }
  },
  populateOneCalendarRow: (state, payload) => {
    let oneCalendarDay = {
      id: 0,
      date: '',
      day: '',
      dayId: null,
      active: '',
      passive: '',
      coding: '',
      tag: { id: null, name: null },
      project: { id: null, name: null },
      description: '',
      weekRow: null,
    };

    const date = new Date();
    const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

    date.setFullYear(state.year);
    date.setMonth(state.month.number);
    date.setDate(payload.rowId);

    oneCalendarDay.id = payload.rowId;
    oneCalendarDay.date = `${state.month.number + 1}/${payload.rowId}`;
    oneCalendarDay.day = dayFormat.format(date);
    oneCalendarDay.dayId = moduleFunctions.setDayOfWeekId(oneCalendarDay.day);
    if (payload.dayObject.active_time != 0) {
      oneCalendarDay.active = moduleFunctions.convertNumberToTime(
        payload.dayObject.active_time
      );
    }
    if (payload.dayObject.passive_time != 0) {
      oneCalendarDay.passive = moduleFunctions.convertNumberToTime(
        payload.dayObject.passive_time
      );
    }
    if (payload.dayObject.coding_problems_time != 0) {
      oneCalendarDay.coding = moduleFunctions.convertNumberToTime(
        payload.dayObject.coding_problems_time
      );
    }
    if (payload.dayObject.tag != null) {
      oneCalendarDay.tag = payload.dayObject.tag;
    }
    if (payload.dayObject.project != null) {
      oneCalendarDay.project = payload.dayObject.project;
    }
    if (payload.dayObject.description != null) {
      oneCalendarDay.description = payload.dayObject.description;
    }

    state.calendar.push(oneCalendarDay);
  },
  updateOneCalendarRow: (state, payload) => {
    state.calendar[payload.inAppId - 1].active = payload.activeTime;
    state.calendar[payload.inAppId - 1].passive = payload.passiveTime;
    state.calendar[payload.inAppId - 1].coding = payload.codingChallengesTime;
    state.calendar[payload.inAppId - 1].tag = payload.tag;
    state.calendar[payload.inAppId - 1].project = payload.project;
    state.calendar[payload.inAppId - 1].description = payload.description;
  },
  setWeekTotals: (state) => {
    for (let x = 0; x < state.calendar.length; x++) {
      let rowTotal = 0;
      let rowTime = null;
      if (state.calendar[x].dayId == 0 || x == 0) {
        rowTotal = moduleFunctions.totalTimesToNumber(
          state.calendar[x].active,
          state.calendar[x].passive,
          state.calendar[x].coding
        );
        rowTime = moduleFunctions.convertNumberToTime(rowTotal);

        state.calendar[x].weekRow = { rowTotal: rowTotal, rowTime: rowTime };
      } else {
        rowTotal =
          state.calendar[x - 1].weekRow.rowTotal +
          moduleFunctions.totalTimesToNumber(
            state.calendar[x].active,
            state.calendar[x].passive,
            state.calendar[x].coding
          );
        rowTime = moduleFunctions.convertNumberToTime(rowTotal);

        state.calendar[x].weekRow = { rowTotal: rowTotal, rowTime: rowTime };
      }
    }
  },
  setMonthTotals: (state) => {
    let monthTotal = 0;
    let activeTotal = 0;
    let passiveTotal = 0;
    let codingChallengesTotal = 0;
    let mainProject = [];
    let mainTag = [];

    function mode(array) {
      if (array.length == 0) {
        return '--';
      }
      let modeMap = {};
      let maxEl = array[0];
      let maxCount = 1;
      for (let i = 0; i < array.length; i++) {
        let el = array[i];
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      if (maxEl == null) {
        return '--';
      } else {
        return maxEl;
      }
    }

    for (let x = 0; x < state.calendar.length; x++) {
      activeTotal =
        activeTotal +
        moduleFunctions.convertTimeToNumber(state.calendar[x].active);
      passiveTotal =
        passiveTotal +
        moduleFunctions.convertTimeToNumber(state.calendar[x].passive);
      codingChallengesTotal =
        codingChallengesTotal +
        moduleFunctions.convertTimeToNumber(state.calendar[x].coding);
      if (state.calendar[x].project.name != null) {
        mainProject.push(state.calendar[x].project.name);
      }
      if (state.calendar[x].tag.name != null) {
        mainTag.push(state.calendar[x].tag.name);
      }
    }
    monthTotal = activeTotal + passiveTotal + codingChallengesTotal;
    state.monthTotals.monthTime = moduleFunctions.convertNumberToTime(
      monthTotal
    );
    state.monthTotals.activeTime = moduleFunctions.convertNumberToTime(
      activeTotal
    );
    state.monthTotals.passiveTime = moduleFunctions.convertNumberToTime(
      passiveTotal
    );
    state.monthTotals.codingChallengesTime = moduleFunctions.convertNumberToTime(
      codingChallengesTotal
    );
    state.monthTotals.mainProject = mode(mainProject);
    state.monthTotals.mainTag = mode(mainTag);
  },
};

const actions = {
  fetchRowsWithValues: async ({ rootState }, date) => {
    try {
      const res = await fetch(
        `${globalUrl}gridmonth/?date=${date}&userid=${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();
      if (res.status == 200) {
        return jsonResponse;
      } else {
        alert(jsonResponse.response);
        router.push('/forbidden');
      }
    } catch (err) {
      console.log(err);
    }
  },
  generateAllCalendarRows: async ({ commit, dispatch, state }) => {
    let monthNumber = state.month.number + 1;
    if (monthNumber < 10) {
      monthNumber = '0' + monthNumber.toString();
    }
    const yearAndMonth = `${state.year}-${monthNumber}`;
    const fetchedRowInformation = await dispatch(
      'fetchRowsWithValues',
      yearAndMonth
    );
    const extractedDates = moduleFunctions.convertDates(fetchedRowInformation);
    const numberOfDaysInMonth = [
      31,
      28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const numberOfDaysInThisMonth = numberOfDaysInMonth[state.month.number];
    let dateEntered = false;
    for (let id = 1; id <= numberOfDaysInThisMonth; id++) {
      for (let entry = 0; entry < extractedDates.length; entry++) {
        if (id == extractedDates[entry]) {
          commit('populateOneCalendarRow', {
            rowId: id,
            dayObject: fetchedRowInformation[entry],
          });

          dateEntered = true;
          break;
        }
      }
      if (dateEntered == false) {
        commit('populateOneCalendarRow', {
          rowId: id,
          dayObject: {
            active_time: 0,
            passive_time: 0,
            coding_problems_time: 0,
            project: null,
            tag: null,
            description: null,
          },
        });
      }
      dateEntered = false;
    }
    commit('setWeekTotals');
    commit('setMonthTotals');
  },
  addGridRow: async ({ rootState, state, commit }, rowEntryInfo) => {
    try {
      const formattedDate = rowEntryInfo.inAppDate + '/' + state.year;
      const res = await fetch(`${globalUrl}gridmonth`, {
        method: 'POST',
        body: JSON.stringify({
          userId: rootState.userAccounts.loggedInUser.userId,
          inAppDate: formattedDate,
          activeTime: rowEntryInfo.activeTime,
          passiveTime: rowEntryInfo.passiveTime,
          codingChallengesTime: rowEntryInfo.codingChallengesTime,
          tag: rowEntryInfo.tag.id,
          project: rowEntryInfo.project.id,
          description: rowEntryInfo.description,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.status == 200) {
        commit('updateOneCalendarRow', rowEntryInfo);
        commit('setWeekTotals');
        commit('setMonthTotals');
      } else {
        console.log(await res.json());
        //router.push('/forbidden');
      }
    } catch (err) {
      console.log('addGridRow: ' + err);
    }
  },
};

//Functions

export default {
  state,
  getters,
  actions,
  mutations,
};
