<template>
  <div id="grid-view">
    <div id="side-nav">
      <SideNavigationBar />
    </div>
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
        <h2>{{ month.name }}, {{ year }}</h2>
        <button @click="decreaseMonthYear">&lt;</button>
        <button @click="increaseMonthYear">&gt;</button>
      </div>
      <Calendar :month="month" :year="year" :key="componentKey" />
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import Calendar from '../components/Calendar';
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';

  //on load this page needs to get the totals from the db for the amount of times
  // each month. When you go to different months then it will make a request to the
  // db for that months info. The day total, week total, month total will be calculated
  // client side

  export default {
    name: 'CoreGridView',
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
      ...mapMutations([
        'increaseOrDecreaseMonthandYear',
        'setTodaysDateMonthYear',
      ]),
      decreaseMonthYear() {
        this.increaseOrDecreaseMonthandYear('-');
        this.componentKey++;
      },
      increaseMonthYear() {
        this.increaseOrDecreaseMonthandYear('+');
        this.componentKey++;
      },
    },
    computed: {
      ...mapGetters(['Year', 'Month']),
      year() {
        return this.Year;
      },
      month() {
        return this.Month;
      },
    },
    created() {
      this.setTodaysDateMonthYear();
    },
  };
</script>

<style scoped>
  #main-container {
    margin-left: 7rem;
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
    padding-left: 5rem;
  }
</style>
