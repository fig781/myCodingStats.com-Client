import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  data() {
    return {
      chartOptions: {
        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    };
  },
  extends: Bar,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
