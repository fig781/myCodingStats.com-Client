<template>
  <div
    class="row"
    :class="oddId && shader"
    @click="showCalendarDayEdit(oneCalendarDay)"
  >
    <div class="row__cell row__cell--date">
      {{ oneCalendarDay.date }}
    </div>
    <div class="row__cell row__cell--day">
      {{ oneCalendarDay.day }}
    </div>
    <div class="row__cell row__cell--mobile-shaded">
      <div class="row__mobile">Active time:</div>
      {{ oneCalendarDay.active }}
    </div>
    <div class="row__cell">
      <div class="row__mobile">Passive time:</div>
      {{ oneCalendarDay.passive }}
    </div>
    <div class="row__cell row__cell--mobile-shaded">
      <div class="row__mobile">Coding Challenges time:</div>
      {{ oneCalendarDay.coding }}
    </div>
    <div class="row__cell row__cell--flex">
      <div class="row__mobile">Tag:</div>
      <div :class="tagNotNull && rounded">
        {{ oneCalendarDay.tag.name }}
      </div>
    </div>
    <div class="row__cell row__cell--flex row__cell--mobile-shaded">
      <div class="row__mobile">Project:</div>
      <div :class="projectNotNull && rounded">
        {{ oneCalendarDay.project.name }}
      </div>
    </div>
    <div class="row__cell ">
      <div class="row__mobile">Description:</div>
      {{ oneCalendarDay.description }}
    </div>
    <div class="row__cell row__cell--total row__cell--mobile-shaded">
      <div class="row__mobile">Day Total:</div>
      {{ dayTotal }}
    </div>
    <div class="row__cell row__cell--total " :class="sunday && highlightWeek">
      <div class="row__mobile">Week Total:</div>
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
        shader: 'row__cell--shaded',
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
  .row {
    display: table-row;
  }
  .row__cell {
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

  .row__cell--total {
    border-left: 1px solid grey;
  }
  .row__cell--date {
    color: #1f43b8;
    padding-left: 10px;
  }
  .row:hover {
    background-color: rgba(121, 134, 252, 0.233);
    cursor: pointer;
  }
  .row__cell--shaded {
    background-color: #0951ec18;
  }

  .row__mobile {
    display: none;
  }
  .highlightWeek {
    border-top: solid grey 1px;
    border-bottom: solid grey 1px;
    font-weight: bold;
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

  @media only screen and (max-width: 768px) {
    .row {
      display: grid;
      border: 1px solid rgba(167, 167, 167, 0.466);
      margin: 5px;
      border-radius: 5px;
      background-color: #f7fbff;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    }
    .row__cell {
      padding: 2px 5px 2px 5px;
      max-width: none;
      text-align: left;
    }
    .row__mobile {
      display: inline;
    }
    .row__cell--total {
      border: none;
      border-radius: 0px 0px 5px 5px;
    }
    .highlightWeek {
      border: none;
    }
    .row__cell--date {
      text-align: center;
      background-color: #0951ec18;
      border-radius: 5px 5px 0px 0px;
    }
    .row__cell--day {
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
    .row__cell--flex {
      display: flex;
    }
    .row__cell--mobile-shaded {
      background-color: rgba(61, 61, 61, 0.075);
    }
  }
</style>
