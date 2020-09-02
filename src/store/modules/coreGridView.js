//import axios from 'axios'

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
};

const getters = {
  Year: (state) => state.year,
  Month: (state) => state.month,
};

const mutations = {
  //Only runs when the CoreGridView component is initially rendered.
  //This function is used to initially populate all the main variables used.
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
  increaseOrDecreaseMonthandYear: (state, payload) => {
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

    if (payload == '+') {
      if (state.month.number === 11) {
        state.month.number = 0;
        state.month.name = months[state.month.number];
        state.year++;
      } else {
        state.month.number++;
        state.month.name = months[state.month.number];
      }
    } else if (payload == '-') {
      if (state.month.number === 0) {
        state.month.number = 11;
        state.month.name = months[state.month.number];
        state.year--;
      } else {
        state.month.number--;
        state.month.name = months[state.month.number];
      }
    } else {
      console.error('function missing correct parameter');
    }
  },
};

//Used to run mutations asyncronusly
const actions = {};

//Constants used in mutations
// const numberOfDaysInMonth = {
//   'January':31,
//   'February':28,
//   'March':31,
//   'April':30,
//   'May':31,
//   'June':30,
//   'July':31,
//   'August':31,
//   'September':30,
//   'October':31,
//   'November':30,
//   'December':31
// }

// const daysOfWeek = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   "Friday",
//   "Saturday"
// ]

export default {
  state,
  getters,
  actions,
  mutations,
};
