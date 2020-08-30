<template>
  <table>
    <tr>
      <th colspan="2">Date</th>
      <th>Active Learning</th>
      <th>Passive Learning</th>
      <th>Coding Challenges</th>
      <th>Project(s)</th>
      <th>Description</th>
      <th>Day Total</th>
      <th>Week Total</th>
    </tr>
    <tr v-for="calendarDay in Calendar" :key="calendarDay.id">
      <td>{{ calendarDay.date }}</td>
      <td>{{ calendarDay.day }}</td>
      <td>{{ calendarDay.active }}</td>
      <td>{{ calendarDay.passive }}</td>
      <td>{{ calendarDay.coding }}</td>
      <td>{{ calendarDay.project }}</td>
      <td>{{ calendarDay.desc }}</td>
      <td>{{ calendarDay.day_total }}</td>
      <td>{{ calendarDay.week_total }}</td>
    </tr>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Calendar',
    data() {
      return {
        numberOfDaysThisInThisMonth: 0,
      };
    },
    methods: {},
    computed: {
      ...mapGetters(['Month', 'Calendar']),
      month() {
        return this.Month.number;
      },
      calendar() {
        return this.Calendar;
      },
    },
    beforeMount() {
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
      this.numberOfDaysThisInThisMonth = numberOfDaysInMonth[this.month];
      for (var x = 1; x <= this.numberOfDaysThisInThisMonth; x++) {
        this.$store.commit('populateCalendarDate', x);
      }
    },
  };
</script>

<style scoped>
  table {
    border-collapse: collapse;
    margin-left: 5rem;
  }

  th {
    border: 1px solid black;
    padding-top: 2px;
    padding-top: 2px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  td {
    border: 1px solid grey;
    padding: 2px;
    text-align: center;
  }
</style>
