<template>
  <div class="table-row">
    <div class="table-cell">{{ oneCalendarDay.date }}</div>
    <div class="table-cell">{{ oneCalendarDay.day }}</div>
    <div class="table-cell">{{ oneCalendarDay.active }}</div>
    <div class="table-cell">{{ oneCalendarDay.passive }}</div>
    <div class="table-cell">{{ oneCalendarDay.coding }}</div>
    <div class="table-cell">{{ oneCalendarDay.project }}</div>
    <div class="table-cell">{{ oneCalendarDay.desc }}</div>
    <div class="table-cell">{{ oneCalendarDay.day_total }}</div>
    <div class="table-cell">{{ oneCalendarDay.week_total }}</div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarDay',
    props: {
      oneCalendarDay: Object,
    },
  };
</script>

<style>
  .table-cell {
    display: table-cell;
    border: 1px solid grey;
    padding: 2px;
    text-align: center;
  }
  .table-row {
    display: table-row;
  }
</style>
