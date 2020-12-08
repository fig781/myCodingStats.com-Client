<template>
  <div
    id="table-row"
    :class="oddId && shader"
    @click="showCalendarDayEdit(oneCalendarDay)"
  >
    <div class="table-cell date">
      {{ oneCalendarDay.date }}
    </div>
    <div class="table-cell day">{{ oneCalendarDay.day }}</div>
    <div class="table-cell mobile-shaded">
      <div class="mobile-only">Active time:</div>
      {{ oneCalendarDay.active }}
    </div>
    <div class="table-cell">
      <div class="mobile-only">Passive time:</div>
      {{ oneCalendarDay.passive }}
    </div>
    <div class="table-cell mobile-shaded">
      <div class="mobile-only">Coding Challenges time:</div>
      {{ oneCalendarDay.coding }}
    </div>
    <div class="table-cell mobile-flex ">
      <div class="mobile-only">Tag:</div>
      <div :class="tagNotNull && rounded">
        {{ oneCalendarDay.tag.name }}
      </div>
    </div>
    <div class="table-cell mobile-flex mobile-shaded">
      <div class="mobile-only">Project:</div>
      <div :class="projectNotNull && rounded">
        {{ oneCalendarDay.project.name }}
      </div>
    </div>
    <div class="table-cell ">
      <div class="mobile-only">Description:</div>
      {{ oneCalendarDay.description }}
    </div>
    <div class="table-cell total mobile-shaded">
      <div class="mobile-only">Day Total:</div>
      {{ dayTotal }}
    </div>
    <div class="table-cell total " :class="sunday && highlightWeek">
      <div class="mobile-only">Week Total:</div>
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
  #table-row {
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
    max-width: 9vw;
    text-overflow: ellipsis;
    text-align: center;
    padding-right: 5px;
    padding-left: 5px;
    background-color: #f0f3f6;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034);
  }
  .total {
    border-left: 1px solid grey;
  }
  .date {
    color: #1f43b8;
    padding-left: 10px;
  }
  #table-row:hover {
    background-color: rgba(121, 134, 252, 0.233);
    cursor: pointer;
  }
  .shaded {
    background-color: #0951ec18;
  }
  .highlightWeek {
    border-top: solid grey 1px;
    border-bottom: solid grey 1px;
    font-weight: bold;
  }
  .mobile-only {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    #table-row {
      display: grid;
      border: 1px solid rgba(167, 167, 167, 0.466);
      margin: 5px;
      border-radius: 5px;
      background-color: #f7fbff;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    }
    .table-cell {
      padding: 2px 5px 2px 5px;
      max-width: none;
      text-align: left;
    }
    .mobile-only {
      display: inline;
    }
    .total {
      border: none;
      border-radius: 0px 0px 5px 5px;
    }
    .highlightWeek {
      border: none;
    }
    .date {
      text-align: center;
      background-color: #0951ec18;
      border-radius: 5px 5px 0px 0px;
    }
    .day {
      text-align: center;
      font-weight: 700;
    }
    .rounded {
      border: 1px solid grey;
      border-radius: 25px;
      white-space: nowrap;
      overflow: hidden;
      max-width: 150px;
      text-overflow: ellipsis;
    }
    .mobile-flex {
      display: flex;
    }
    .mobile-shaded {
      background-color: rgba(61, 61, 61, 0.075);
    }
  }
</style>
