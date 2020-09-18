<template>
  <div class="table-row" :class="oddId && shader">
    <div class="table-cell date">{{ oneCalendarDay.date }}</div>
    <div class="table-cell">{{ oneCalendarDay.day }}</div>
    <div class="table-cell">{{ oneCalendarDay.active }}</div>
    <div class="table-cell">{{ oneCalendarDay.passive }}</div>
    <div class="table-cell">{{ oneCalendarDay.coding }}</div>
    <div class="table-cell">{{ oneCalendarDay.project }}</div>
    <div class="table-cell">{{ oneCalendarDay.desc }}</div>
    <div class="table-cell">{{ oneCalendarDay.dayTotal }}</div>
    <div class="table-cell">{{ oneCalendarDay.weekTotal }}</div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarDay',
    data() {
      return {
        oddId: false,
        shader: 'shaded',
      };
    },
    props: {
      oneCalendarDay: Object,
    },
    mounted() {
      if (this.oneCalendarDay.id % 2 != 0) {
        this.oddId = true;
      }
    },
  };
</script>

<style>
  .table-cell {
    display: table-cell;
    padding-top: 4px;
    padding-bottom: 4px;
    text-align: center;
  }
  .table-row {
    display: table-row;
  }
  .date {
    color: #5f7bb6;
  }
  .shaded {
    background-color: #4a7eee18;
  }
</style>
