<template>
  <div class="tag-totals">
    <h3 class="tag-totals__title">Total Time on each {{ title }}</h3>
    <p class="tag-totals__no-tags" v-if="tags.length == 0">
      Looks like there are no data
    </p>
    <div class="tag-display">
      <div class="tag-row" v-for="tag in tags" :key="tag.id">
        <p class="tag-row__cell tag-row__name">{{ tag.name }}</p>
        <div class="tag-row__cell">
          <span
            class="tag-row__bar"
            :style="{
              width:
                tag.percentage == 0.0 ? '3px' : tag.percentage * 300 + 'px',
            }"
          ></span>
          <p class="tag-row__total">{{ tag.total }}</p>
        </div>
      </div>
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
  .tag-totals__no-tags {
    text-align: center;
  }
  .tag-display {
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tag-row {
    display: table-row;
    border-bottom: 5px solid transparent;
  }
  .tag-row__name {
    text-align: right;
    padding-right: 5px;
  }
  .tag-row__bar {
    height: 20px;
    background-color: #1f43b8;
    display: inherit;
  }
  .tag-row__cell {
    display: table-cell;
  }
  .tag-row__total {
    display: inherit;
    padding-left: 5px;
  }
</style>
