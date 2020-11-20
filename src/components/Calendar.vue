<template>
  <div id="table">
    <div class="table-row">
      <div class="table-header">
        <p class="table-header-text">Date</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Day</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Active Learning</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Passive Learning</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Coding Challenges</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Tag</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Project</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Description</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Day Total</p>
      </div>
      <div class="table-header" id="last-column">
        <p class="table-header-text">Week Total</p>
      </div>
    </div>
    <CalendarDay
      v-for="calendarDay in calendar"
      :key="calendarDay.id"
      :oneCalendarDay="calendarDay"
      @toggleCalendarDayEdit="toggleCalendarDayEdit"
    />
    <CalendarDayEdit
      v-if="showCalendarDayEdit"
      @close="showCalendarDayEdit = false"
      :oneCalendarDay="dayToEdit"
    />
  </div>
</template>

<script>
  import CalendarDay from './CalendarDay';
  import CalendarDayEdit from './CalendarDayEdit';
  export default {
    name: 'Calendar',
    components: {
      CalendarDay,
      CalendarDayEdit,
    },
    props: {
      month: Object,
      year: Number,
      calendar: Array,
    },
    data() {
      return {
        showCalendarDayEdit: false,
        dayToEdit: Object,
      };
    },
    methods: {
      toggleCalendarDayEdit(rowInfo) {
        this.dayToEdit = rowInfo;
        this.showCalendarDayEdit = true;
      },
    },
  };
</script>

<style scoped>
  #table {
    display: table;
    border-collapse: collapse;
    margin-left: 3rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid grey;
  }
  .table-row {
    display: table-row;
  }
  #last-column {
    padding-right: 10px;
  }
  .table-header {
    display: table-cell;
    white-space: nowrap;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 12px;
    padding-left: 12px;
    border-bottom: 1px solid grey;
  }
  .table-header-text {
    font-weight: bold;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
</style>
