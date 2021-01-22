<template>
  <div>
    <BarChart :chart-date="dateCollection">
  </div>
</template>

<script>
import BarChart from './AppAnalyticsBarChart'
export default {
  name:'AppAnalyticsBarChart',
  props:{
    chartData:[]
  },
  components:{
    BarChart
  }
}
</script>

<style>

</style>