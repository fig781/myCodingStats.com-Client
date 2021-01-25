<template>
  <div class="chart-container">
    <bar-chart :chart-data="chartData" />
  </div>
</template>

<script>
  import BarChart from './BarChart';
  export default {
    name: 'AppAnalyticsBarChart',
    components: {
      BarChart,
    },
    props: {
      chartData: Object,
    },
  };
</script>

<style scoped>
  .chart-container {
    max-width: 1400px;
  }
</style>
