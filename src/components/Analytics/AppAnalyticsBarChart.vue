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
    data() {
      return {
        chartData: {
          labels: [
            '1/1',
            '1/2',
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
          ],
          datasets: [
            {
              label: 'Active Time',
              backgroundColor: '#f87979',
              data: [
                0,
                10,
                5,
                2,
                20,
                30,
                45,
                0,
                10,
                5,
                2,
                20,
                30,
                45,
                0,
                10,
                5,
                2,
                20,
                30,
                45,
              ],
            },
            {
              label: 'Passive Time',
              backgroundColor: '#b48484',
              data: [
                0,
                10,
                5,
                2,
                20,
                30,
                45,
                10,
                5,
                2,
                20,
                30,
                45,
                0,
                10,
                5,
                2,
                20,
                30,
                45,
                0,
                10,
                5,
              ],
            },
            {
              label: 'Coding Challenges Time',
              backgroundColor: '#b1a79d',
              data: [
                0,
                10,
                5,
                2,
                20,
                30,
                45,
                10,
                5,
                2,
                20,
                30,
                45,
                0,
                10,
                5,
                2,
                20,
                30,
                45,
                0,
                10,
                5,
              ],
            },
          ],
        },
      };
    },
  };
</script>

<style scoped>
  .chart-container {
    max-width: 1200px;
    max-height: 200px;
  }
</style>
