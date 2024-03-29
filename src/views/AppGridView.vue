<template>
  <div>
    <MobileNav />
    <div id="grid-view">
      <SideNavigationBar />
      <div id="main-container">
        <div id="headings-container">
          <h1>My Monthly Progress</h1>

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
          <img
            src="../assets/left-arrow.png"
            @click="decreaseMonthYear"
            alt="left-arrow"
          />
          <img
            src="../assets/right-arrow.png"
            @click="increaseMonthYear"
            alt="right-arrow"
          />
          <h2 class="month-container__date">{{ month.name }} {{ year }}</h2>
          <Loader v-if="loading" />
        </div>
        <transition :name="transitionDirection">
          <Calendar
            :month="month"
            :year="year"
            :calendar="calendar"
            :key="componentKey"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import Calendar from '../components/Grid/Calendar';
  import MobileNav from '../components/MobileNav';
  import Loader from '../components/Loader';

  export default {
    name: 'AppGridView',
    components: {
      SideNavigationBar,
      Calendar,
      MobileNav,
      Loader,
    },
    data() {
      return {
        componentKey: 0,
        mobile: false,
        transitionDirection: 'left-transition',
        loading: false,
      };
    },
    methods: {
      async decreaseMonthYear() {
        this.loading = true;
        this.$store.commit('clearCalendar');
        this.$store.commit('decreaseMonthAndYear');
        this.componentKey++;
        this.transitionDirection = 'left-transition';
        await this.$store.dispatch('generateAllCalendarRows');
        this.loading = false;
      },
      async increaseMonthYear() {
        this.loading = true;
        this.$store.commit('clearCalendar');
        this.$store.commit('increaseMonthAndYear');
        this.componentKey++;
        this.transitionDirection = 'right-transition';
        await this.$store.dispatch('generateAllCalendarRows');
        this.loading = false;
      },
    },
    computed: {
      year() {
        return this.$store.getters.gridYear;
      },
      month() {
        return this.$store.getters.gridMonth;
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
    async created() {
      this.loading = true;
      this.$store.commit('setTodaysDate');
      this.$store.commit('clearCalendar');
      await this.$store.dispatch('actionSetInitialGridMonthYear');
      await this.$store.dispatch('generateAllCalendarRows');
      this.loading = false;
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
    border: solid 1px rgb(128, 128, 128);
    font-size: 20px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
  }
  .total-number {
    font-size: 32px;
  }
  .highlight {
    font-family: 'Montserrat', sans-serif;
  }
  #month-container {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    padding-left: 3rem;
    font-family: 'Montserrat', sans-serif;
  }
  #month-container h2 {
    font-size: 27px;
  }
  .month-container__date {
    margin-right: 15px;
  }
  img {
    cursor: pointer;
    max-height: 26px;
    max-width: 26px;
  }
  img:hover {
    filter: invert(44%) sepia(0%) saturate(153%) hue-rotate(166deg) brightness(98%)
      contrast(92%);
  }
  .right-transition-enter-active {
    transition: all 0.1s;
  }
  .right-transition-leave-active {
    transition: all 0.3s;
  }

  .left-transition-enter,
  .right-transition-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .left-transition-enter-active {
    transition: all 0.1s;
  }
  .left-transition-leave-active {
    transition: all 0.3s;
  }
  .left-transition-enter,
  .left-transition-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
  @media only screen and (max-width: 768px) {
    #grid-view {
      margin: 0px 5% 0px 5%;
    }
    #main-container {
      margin-left: 0px;
    }
    #month-container {
      padding-left: 0;
    }
    h1 {
      margin-left: 0;
      padding-top: 0;
      margin-top: 10px;
    }
    #totals-container {
      margin-left: 0;
      justify-content: center;
    }
    .total {
      padding: 5px;
      border-radius: 5px;
      margin: 5px;
      border: solid 1px grey;
      font-size: 12px;
    }
    .total-number {
      font-size: 20px;
    }
  }
</style>
