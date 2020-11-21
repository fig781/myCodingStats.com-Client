<template>
  <div id="grid-view">
    <SideNavigationBar />
    <div id="main-container">
      <div id="headings-container">
        <h1>Monthly Progress</h1>
        <div id="totals-container">
          <div class="total">
            <p class="highlight">Time this Month</p>
            <p class="total-number">{{ monthTotals.monthTime }}</p>
          </div>
          <div class="total">
            <p class="highlight">Active Learning</p>
            <p class="total-number">{{ monthTotals.activeTime }}</p>
          </div>
          <div class="total">
            <p class="highlight">Passive Learning</p>
            <p class="total-number">{{ monthTotals.passiveTime }}</p>
          </div>
          <div class="total">
            <p class="highlight">Coding Challenges Time</p>
            <p class="total-number">{{ monthTotals.codingChallengesTime }}</p>
          </div>
          <div class="total">
            <p class="highlight">Main Tag</p>
            <p class="total-number">{{ monthTotals.mainTag }}</p>
          </div>
          <div class="total">
            <p class="highlight">Main Project</p>
            <p class="total-number">{{ monthTotals.mainProject }}</p>
          </div>
        </div>
      </div>
      <div id="month-container">
        <img src="../assets/left-arrow.png" @click="decreaseMonthYear" />
        <img src="../assets/right-arrow.png" @click="increaseMonthYear" />
        <h2>{{ month.name }}, {{ year }}</h2>
      </div>
      <Calendar
        :month="month"
        :year="year"
        :calendar="calendar"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import Calendar from '../components/Calendar';

  export default {
    name: 'AppGridView',
    components: {
      SideNavigationBar,
      Calendar,
    },
    data() {
      return {
        componentKey: 0,
      };
    },
    methods: {
      decreaseMonthYear() {
        this.$store.commit('clearCalendar');
        this.$store.commit('decreaseMonthAndYear');
        this.$store.dispatch('generateAllCalendarRows');
        this.componentKey++;
      },
      increaseMonthYear() {
        this.$store.commit('clearCalendar');
        this.$store.commit('increaseMonthAndYear');
        this.$store.dispatch('generateAllCalendarRows');
        this.componentKey++;
      },
    },
    computed: {
      year() {
        return this.$store.getters.year;
      },
      month() {
        return this.$store.getters.month;
      },
      calendar() {
        return this.$store.getters.calendar;
      },
      monthTotals() {
        return this.$store.getters.monthTotals;
      },
      allTags() {
        return this.$store.getters.getAllTags;
      },
      allProjects() {
        return this.$store.getters.getAllProjects;
      },
    },
    created() {
      this.$store.commit('clearCalendar');
      this.$store.commit('setTodaysDateMonthYear');
      this.$store.dispatch('generateAllCalendarRows');
      if (this.allTags.length == 0 && this.allProjects.length == 0) {
        this.$store.dispatch('fetchAllTags');
        this.$store.dispatch('fetchAllProjects');
      }
    },
  };
</script>

<style scoped>
  h1 {
    font-family: 'Montserrat', sans-serif;
    padding-top: 3rem;
    margin-left: 3rem;
  }
  #main-container {
    margin-left: 5rem;
  }
  #totals-container {
    display: flex;
    margin-left: 3rem;
    margin-top: 15px;
    margin-bottom: 25px;
    flex-wrap: wrap;
  }
  .total {
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    margin: 5px;
    border: solid 1px grey;
    font-size: 20px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048);
  }
  .total-number {
    font-size: 32px;
  }
  .highlight {
    font-family: 'Montserrat', sans-serif;
  }
  #month-container {
    display: flex;
    padding-bottom: 0.5rem;
    padding-left: 3rem;
    font-family: 'Montserrat', sans-serif;
  }
  img {
    cursor: pointer;
    max-height: 20px;
    max-width: 20px;
  }
</style>
