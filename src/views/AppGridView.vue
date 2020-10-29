<template>
  <div id="grid-view">
    <SideNavigationBar />
    <div id="main-container">
      <div id="headings-container">
        <h1>Monthly Progress</h1>
        <div id="totals-container">
          <div class="totals-row">
            <div class="total">
              <h4>Time this Week:</h4>
              <p>0:00</p>
            </div>
            <div class="total">
              <h4>Time this Month:</h4>
              <p>0:00</p>
            </div>
          </div>
          <div class="totals-row">
            <div class="total">
              <h4>Active Learning this Month:</h4>
              <p>0:00</p>
            </div>
            <div class="total">
              <h4>Passive Learning this Month:</h4>
              <p>0:00</p>
            </div>
          </div>
          <div class="totals-row">
            <div class="total">
              <h4>Coding Challenges Time this Month:</h4>
              <p>0:00</p>
            </div>
            <div class="total">
              <h4>Main Project:</h4>
              <p>Big Project</p>
            </div>
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
  #main-container {
    margin-left: 5rem;
  }
  #totals-container {
    display: flex;
    justify-content: center;
  }
  .total {
    display: flex;
    padding: 0.5rem;
  }
  h1 {
    padding-top: 3rem;
    margin-left: 3rem;
  }
  #month-container {
    display: flex;
    padding-bottom: 0.5rem;
    padding-left: 3rem;
  }
  img {
    cursor: pointer;
    max-height: 20px;
    max-width: 20px;
  }
</style>
