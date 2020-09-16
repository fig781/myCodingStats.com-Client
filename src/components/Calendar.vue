<template>
  <div id="table">
    <div class="table-row">
      <div class="table-header">Date</div>
      <div class="table-header">Day</div>
      <div class="table-header">Active Learning</div>
      <div class="table-header">Passive Learning</div>
      <div class="table-header">Coding Challenges</div>
      <div class="table-header">Project(s)</div>
      <div class="table-header">Description</div>
      <div class="table-header">Day Total</div>
      <div class="table-header">Week Total</div>
    </div>
    <CalendarDay
      v-for="calendarDay in calendar"
      :key="calendarDay.id"
      :oneCalendarDay="calendarDay"
    />
  </div>
</template>

<script>
  import CalendarDay from './CalendarDay';
  import router from '../router/index';

  export default {
    name: 'Calendar',
    components: {
      CalendarDay,
    },
    props: {
      month: Object,
      year: Number,
    },
    data() {
      return {
        numberOfDaysInThisMonth: 0,
        calendar: [],
      };
    },
    methods: {
      populateCalendarRow(dayNumber) {
        let oneCalendarDay = {
          id: 0,
          date: '',
          day: '',
          active: '0:00',
          passive: '0:00',
          coding: '0:00',
          project: '',
          desc: '',
          day_total: '0:00',
          week_total: '0:00',
        };

        const date = new Date();
        const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

        date.setFullYear(this.year);
        date.setMonth(this.month.number);
        date.setDate(dayNumber);

        oneCalendarDay.id = dayNumber;
        oneCalendarDay.date = `${this.month.number + 1}/${dayNumber}`;
        oneCalendarDay.day = dayFormat.format(date);
        //set the other information based on the info from the server
        return oneCalendarDay;
      },

      async populateEachCalendarRow() {
        const yearAndMonth = `${this.year}-${this.month.number + 1}`;
        const fetchedRowInformation = await this.fetchRowsWithValues(
          yearAndMonth,
          this.userId
        );
        console.log('fetchedRowInformation: ' + fetchedRowInformation);
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
        this.numberOfDaysInThisMonth = numberOfDaysInMonth[this.month.number];

        for (var x = 1; x <= this.numberOfDaysInThisMonth; x++) {
          this.calendar.push(this.populateCalendarRow(x));
        }
      },

      async fetchRowsWithValues(date, userId) {
        try {
          const res = await fetch('http://localhost:3000/gridmonth', {
            method: 'POST',
            body: JSON.stringify({ date: date, userId: userId }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          const jsonResponse = await res.json();

          if (res.status == 200) {
            return jsonResponse;
          } else {
            alert(jsonResponse.error);
            router.push('/forbidden');
          }
        } catch (err) {
          console.log(err);
        }
      },
    },

    computed: {
      userId() {
        return this.$store.getters.userId;
      },
    },

    mounted() {
      this.populateEachCalendarRow();
    },
  };
</script>

<style scoped>
  #table {
    display: table;
    border-collapse: collapse;
    margin-left: 5rem;
  }

  .table-row {
    display: table-row;
  }
  .table-header {
    display: table-cell;
    border: 1px solid black;
    padding-top: 2px;
    padding-top: 2px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
</style>
