<template>
  <div class="analytics-chart-container">
    <div class="navigation">
      <img
        class="navigation__arrow"
        src="../../assets/left-arrow.png"
        @click="decreaseMonthYear"
        alt="left-arrow"
      />
      <img
        class="navigation__arrow"
        src="../../assets/right-arrow.png"
        @click="increaseMonthYear"
        alt="right-arrow"
      />
      <h2 class="navigation__date">{{ month.name }} {{ year }}</h2>
    </div>
    <transition name="fade">
      <AppAnalyticsBarChart v-if="loaded" :chartData="chartData" />
    </transition>
  </div>
</template>

<script>
  import AppAnalyticsBarChart from './AppAnalyticsBarChart';
  export default {
    name: 'AppAnalyticsChartContainer',
    data() {
      return {
        loaded: false,
        chartData: null,
        fetchedChartData: null,
      };
    },
    components: {
      AppAnalyticsBarChart,
    },
    methods: {
      async decreaseMonthYear() {
        this.loaded = false;
        this.$store.commit('decreaseAnalyticsMonthAndYear');
        this.fetchedChartData = await this.$store.dispatch(
          'compileChartValues'
        );
        this.fillData();
        this.loaded = true;
      },
      async increaseMonthYear() {
        this.loaded = false;
        this.$store.commit('increaseAnalyticsMonthAndYear');
        this.fetchedChartData = await this.$store.dispatch(
          'compileChartValues'
        );
        this.fillData();
        this.loaded = true;
      },
      fillData() {
        this.chartData = {
          labels: this.fetchedChartData.labels,
          datasets: [
            {
              label: 'Active Time',
              backgroundColor: '#1f43b8',
              data: this.fetchedChartData.activeData,
            },
            {
              label: 'Passive Time',
              backgroundColor: '#1fb894',
              data: this.fetchedChartData.passiveData,
            },
            {
              label: 'Coding Challenges Time',
              backgroundColor: '#b83b1f',
              data: this.fetchedChartData.codingData,
            },
          ],
        };
      },
    },
    computed: {
      year() {
        return this.$store.getters.getAnalyticsYear;
      },
      month() {
        return this.$store.getters.getAnalyticsMonth;
      },
    },
    async mounted() {
      this.loaded = false;
      this.fetchedChartData = await this.$store.dispatch('compileChartValues');
      this.fillData();
      this.loaded = true;
    },
  };
</script>

<style scoped>
  .navigation {
    display: flex;
    margin-top: 5px;
  }
  .navigation__arrow {
    cursor: pointer;
    max-height: 26px;
    max-width: 26px;
  }
  .navigation__arrow:hover {
    filter: invert(44%) sepia(0%) saturate(153%) hue-rotate(166deg)
      brightness(98%) contrast(92%);
  }
  .navigation__date {
    font-family: 'Montserrat', sans-serif;
  }
  .analytics-chart-container {
    padding: 15px;
    border-radius: 5px;
    margin: 5px;
    border: solid 1px rgb(128, 128, 128);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    max-width: 1400px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
