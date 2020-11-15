<template>
  <div class="table-row" :class="oddId && shader">
    <div class="table-cell date" @click="showCalendarDayEdit(oneCalendarDay)">
      {{ oneCalendarDay.date }}
    </div>
    <div class="table-cell">{{ oneCalendarDay.day }}</div>
    <div class="table-cell">{{ oneCalendarDay.active }}</div>
    <div class="table-cell">{{ oneCalendarDay.passive }}</div>
    <div class="table-cell">{{ oneCalendarDay.coding }}</div>
    <div class="table-cell">
      <div :class="tagNotNull && rounded">
        {{ oneCalendarDay.tag.name }}
      </div>
    </div>
    <div class="table-cell">
      <div :class="projectNotNull && rounded">
        {{ oneCalendarDay.project.name }}
      </div>
    </div>
    <div class="table-cell">{{ oneCalendarDay.description }}</div>
    <div class="table-cell total">{{ oneCalendarDay.dayTotal }}</div>
    <div class="table-cell total">{{ oneCalendarDay.weekTotal }}</div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarDay',
    data() {
      return {
        oddId: false,
        shader: 'shaded',
        projectNotNull: false,
        tagNotNull: false,
        rounded: 'rounded',
      };
    },
    props: {
      oneCalendarDay: Object,
    },
    methods: {
      showCalendarDayEdit(rowInfo) {
        this.$emit('toggleCalendarDayEdit', rowInfo);
      },
    },
    mounted() {
      if (this.oneCalendarDay.id % 2 != 0) {
        this.oddId = true;
      }
      if (this.oneCalendarDay.tag.id != null) {
        this.tagNotNull = true;
      }
      if (this.oneCalendarDay.project.id != null) {
        this.projectNotNull = true;
      }
    },
    beforeUpdate() {
      if (this.oneCalendarDay.tag.id != null) {
        this.tagNotNull = true;
      }
      if (this.oneCalendarDay.project.id != null) {
        this.projectNotNull = true;
      }
    },
  };
</script>

<style scoped>
  .table-row {
    display: table-row;
  }
  .table-cell {
    display: table-cell;
    padding-top: 6px;
    padding-bottom: 6px;
    max-width: 20vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
  }
  .rounded {
    border: 1px solid grey;
    border-radius: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    padding-right: 5px;
    padding-left: 5px;
  }
  .total {
    border-left: 1px solid grey;
  }
  .date {
    color: #5f7bb6;
    padding-left: 10px;
  }
  .date:hover {
    background-color: rgba(53, 53, 53, 0.089);
    cursor: pointer;
  }
  .shaded {
    background-color: #4a7eee18;
  }
</style>
