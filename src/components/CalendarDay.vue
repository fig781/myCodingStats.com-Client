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
    <div class="table-cell total">{{ dayTotal }}</div>
    <div class="table-cell total" :class="sunday && highlightWeek">
      {{ oneCalendarDay.weekRow.rowTime }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarDay',
    data() {
      return {
        sunday: false,
        oddId: false,
        today: false,
        shader: 'shaded',
        highlightWeek: 'highlightWeek',
        todayHighlighted: 'todayHighlighted',
        projectNotNull: false,
        tagNotNull: false,
        rounded: 'rounded',
        dayTotal: '',
      };
    },
    props: {
      oneCalendarDay: Object,
    },
    methods: {
      showCalendarDayEdit(rowInfo) {
        this.$emit('toggleCalendarDayEdit', rowInfo);
      },
      totalTimes() {
        const convertedActiveTime = this.convertTime(
          this.oneCalendarDay.active
        );
        const convertedPassiveTime = this.convertTime(
          this.oneCalendarDay.passive
        );
        const convertedCodingTime = this.convertTime(
          this.oneCalendarDay.coding
        );
        const total =
          convertedActiveTime + convertedPassiveTime + convertedCodingTime;
        if (total == 0) {
          this.dayTotal = '0:00';
        } else {
          const minutes = total % 60;
          const hours = Math.floor(total / 60);
          if (minutes < 10) {
            this.dayTotal = `${hours}:0${minutes}`;
          } else {
            this.dayTotal = `${hours}:${minutes}`;
          }
        }
      },
      convertTime(time) {
        if (time.length == 4) {
          return 60 * parseInt(time.slice(0, 1)) + parseInt(time.slice(2, 4));
        } else if (time.length == 5) {
          return 60 * parseInt(time.slice(0, 2)) + parseInt(time.slice(3, 5));
        } else {
          return 0;
        }
      },
    },
    mounted() {
      if (this.oneCalendarDay.id % 2 != 0) {
        this.oddId = true;
      }

      if (this.oneCalendarDay.dayId == 6) {
        this.sunday = true;
      }

      if (this.oneCalendarDay.tag.id != null) {
        this.tagNotNull = true;
      }
      if (this.oneCalendarDay.project.id != null) {
        this.projectNotNull = true;
      }
      if (
        this.oneCalendarDay.active != '' ||
        this.oneCalendarDay.passive != '' ||
        this.oneCalendarDay.coding != ''
      ) {
        this.totalTimes();
      }
    },
    beforeUpdate() {
      if (this.oneCalendarDay.tag.id != null) {
        this.tagNotNull = true;
      }
      if (this.oneCalendarDay.project.id != null) {
        this.projectNotNull = true;
      }
      if (
        this.oneCalendarDay.active != '' ||
        this.oneCalendarDay.passive != '' ||
        this.oneCalendarDay.coding != ''
      ) {
        this.totalTimes();
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
    padding-left: 5px;
    padding-right: 5px;
    max-width: 20vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    text-align: center;
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
  .highlightWeek {
    border-top: solid grey 1px;
    border-bottom: solid grey 1px;
    font-weight: bold;
  }
</style>
