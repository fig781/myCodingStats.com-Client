<template>
  <div class="table">
    <div class="table-row">
      <div class="table-header">
        <p class="table-header__text">Date</p>
      </div>
      <div class="table-header">
        <p class="table-header__text">Day</p>
      </div>
      <div class="table-header">
        <div class="info-header">
          <p class="table-header__text">
            Active Learning
          </p>
          <div
            class="tooltip"
            @mouseover="activeTimeHover = true"
            @mouseleave="activeTimeHover = false"
          >
            <img
              class="tooltip__img"
              src="../../assets/information.png"
              alt="info."
            />
            <span class="tooltip__text tooltip--active" v-if="activeTimeHover">
              Activaly writing code
            </span>
          </div>
        </div>
      </div>
      <div class="table-header">
        <div class="info-header">
          <p class="table-header__text">Passive Learning</p>
          <div
            class="tooltip"
            @mouseover="passiveTimeHover = true"
            @mouseleave="passiveTimeHover = false"
          >
            <img
              class="tooltip__img"
              src="../../assets/information.png"
              alt="info."
            />
            <span
              class="tooltip__text tooltip--passive"
              v-if="passiveTimeHover"
            >
              Watching tutorials and reading guides
            </span>
          </div>
        </div>
      </div>
      <div class="table-header">
        <div class="info-header">
          <p class="table-header__text">Coding Challenges</p>
          <div
            class="tooltip"
            @mouseover="codingTimeHover = true"
            @mouseleave="codingTimeHover = false"
          >
            <img
              class="tooltip__img"
              src="../../assets/information.png"
              alt="info."
            />
            <span class="tooltip__text tooltip--coding" v-if="codingTimeHover">
              Doing coding challenges
            </span>
          </div>
        </div>
      </div>
      <div class="table-header">
        <p class="table-header__text">Tag</p>
      </div>
      <div class="table-header">
        <p class="table-header__text">Project</p>
      </div>
      <div class="table-header">
        <p class="table-header__text">Description</p>
      </div>
      <div class="table-header">
        <p class="table-header__text">Day Total</p>
      </div>
      <div class="table-header table-header--last">
        <p class="table-header__text">Week Total</p>
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
        activeTimeHover: false,
        passiveTimeHover: false,
        codingTimeHover: false,
      };
    },
    methods: {
      toggleCalendarDayEdit(rowInfo) {
        this.dayToEdit = rowInfo;
        this.showCalendarDayEdit = true;
      },
      test() {
        console.log('ran');
      },
    },
  };
</script>

<style scoped>
  .table {
    display: table;
    border-collapse: collapse;
    margin-left: 3rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid grey;
  }
  .table-row {
    display: table-row;
  }
  .table-header--last {
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
  .table-header__text {
    font-weight: bold;
    text-align: center;
  }
  .info-header {
    display: flex;
  }
  .tooltip__img {
    margin-left: 2px;
  }
  .tooltip {
    position: relative;
  }
  .tooltip .tooltip__text {
    background-color: #484c57;
    color: rgb(255, 255, 255);
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    transition: opacity 0.3s;
  }
  .tooltip--active {
    top: -150%;
    margin-left: -88px;
  }
  .tooltip--passive {
    top: -150%;
    left: -715%;
  }
  .tooltip--coding {
    top: -150%;
    left: -455%;
  }

  .tooltip .tooltip-text::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  @media only screen and (max-width: 768px) {
    .table {
      margin-left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .table-row {
      display: none;
    }
  }
</style>
