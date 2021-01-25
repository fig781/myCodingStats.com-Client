<template>
  <div class="chart-container">
    <BarChart :chart-data="chartData" />
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
    max-width: 1200px;
    max-height: 200px;
  }
</style>
