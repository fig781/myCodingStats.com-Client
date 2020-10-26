import router from '../../router/index';
import moduleFunctions from './moduleFunctions';

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
};

const getters = {
  year: (state) => state.year,
  month: (state) => state.month,
  calendar: (state) => state.calendar,
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

  //Runs when pressing the left and right arrow buttons next to the month and year
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
      active: '',
      passive: '',
      coding: '',
      tag: '',
      project: '',
      description: '',
      dayTotal: '',
      week_total: '',
    };

    const date = new Date();
    const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

    date.setFullYear(state.year);
    date.setMonth(state.month.number);
    date.setDate(payload.rowId);

    oneCalendarDay.id = payload.rowId;
    oneCalendarDay.date = `${state.month.number + 1}/${payload.rowId}`;
    oneCalendarDay.day = dayFormat.format(date);
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
    const dayTotals =
      payload.dayObject.active_time +
      payload.dayObject.passive_time +
      payload.dayObject.coding_problems_time;
    if (dayTotals != 0) {
      oneCalendarDay.dayTotal = moduleFunctions.convertNumberToTime(dayTotals);
    }
    //set the other information based on the info from the server
    state.calendar.push(oneCalendarDay);
  },
};

const actions = {
  fetchRowsWithValues: async ({ rootState }, date) => {
    try {
      const res = await fetch(
        `http://localhost:3000/gridmonth/?date=${date}&userid=${rootState.userAccounts.loggedInUser.userId}`,
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
    const yearAndMonth = `${state.year}-${state.month.number + 1}`;
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
  },
};

//Functions

export default {
  state,
  getters,
  actions,
  mutations,
};
