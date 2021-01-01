<template>
  <div class="tag-totals">
    <h3 class="tag-totals__title">Total Time on each {{ title }}</h3>
    <div class="tag-compare" v-for="tag in tags" :key="tag.id">
      <p>{{ tag.name }}</p>
      <span class="tag-compare__bar"></span>
      <p>{{ tag.totalTime }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppAnalyticsTagTotals',
    props: {
      title: String,
      tags: Array,
    },
  };
</script>

<style scoped>
  .tag-totals {
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    margin: 5px;
    border: solid 1px rgb(128, 128, 128);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
  }
  .tag-totals__title {
    margin-bottom: 10px;
  }
  .tag-compare {
    display: flex;
    margin-bottom: 5px;
    justify-content: flex-end;
  }
  .tag-compare__bar {
    width: 200px;
    height: 20px;
    background-color: rgb(56, 53, 202);
    margin: 0 8px;
    justify-content: flex-start;
  }
</style>
