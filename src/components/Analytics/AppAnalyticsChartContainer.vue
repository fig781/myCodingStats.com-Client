<template>
  <div>
    <div class="navigation">
      <img
        src="../../assets/left-arrow.png"
        @click="decreaseMonthYear"
        alt="left-arrow"
      />
      <img
        src="../../assets/right-arrow.png"
        @click="increaseMonthYear"
        alt="right-arrow"
      />
      <h2>{{ month.name }} {{ year }}</h2>
    </div>

    <AppAnalyticsBarChart />
  </div>
</template>

<script>
  import AppAnalyticsBarChart from './AppAnalyticsBarChart';
  export default {
    name: 'AppAnalyticsChartContainer',
    components: {
      AppAnalyticsBarChart,
    },
    methods: {
      decreaseMonthYear() {},
      increaseMonthYear() {},
    },
    computed: {
      year() {
        return this.$store.getters.getAnalyticsYear;
      },
      month() {
        return this.$store.getters.getAnalyticsMonth;
      },
    },
  };
</script>

<style scoped>
  .navigation {
    display: flex;
  }
</style>
