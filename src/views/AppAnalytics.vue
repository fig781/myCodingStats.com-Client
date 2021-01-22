<template>
  <div>
    <SideNavigationBar />
    <MobileNav />
    <div class="main">
      <h1 class="main__header">My Coding Stats</h1>
      <div class="totals">
        <div class="totals__item totals--main">
          <p class="totals__heading">Total Coding Time</p>
          <p class="totals__time">{{ categoryTotals.totalCodingTime }}</p>
        </div>
        <div class="totals__item">
          <p class="totals__heading">Total Active Learning Time</p>
          <p class="totals__time">{{ categoryTotals.totalActiveTime }}</p>
        </div>
        <div class="totals__item">
          <p class="totals__heading">Total Passive Learning Time</p>
          <p class="totals__time">{{ categoryTotals.totalPassiveTime }}</p>
        </div>
        <div class="totals__item">
          <p class="totals__heading">Total Coding Challenges Time</p>
          <p class="totals__time">
            {{ categoryTotals.totalCodingChallengesTime }}
          </p>
        </div>
      </div>
      <div class="tags">
        <AppAnalyticsTagTotals title="Tag" :tags="tagTotals" />
        <AppAnalyticsTagTotals title="Project" :tags="projectTotals" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import MobileNav from '../components/MobileNav';
  import AppAnalyticsTagTotals from '../components/Analytics/AppAnalyticsTagTotals';

  export default {
    name: 'AppAnalytics',
    components: {
      SideNavigationBar,
      MobileNav,
      AppAnalyticsTagTotals,
    },
    computed: {
      tagTotals() {
        return this.$store.getters.getTagTotals;
      },
      projectTotals() {
        return this.$store.getters.getProjectTotals;
      },
      categoryTotals() {
        return this.$store.getters.getCategoryTotals;
      },
    },
    created() {
      this.$store.dispatch('getCategoryTotals');
      this.$store.dispatch('getTagTotals');
      this.$store.dispatch('getProjectTotals');
    },
  };
</script>

<style scoped>
  .main {
    margin-left: 8rem;
  }
  .main__header {
    margin-top: 3rem;
    font-family: 'Montserrat', sans-serif;
  }
  .totals {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .totals__item {
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    margin: 5px;
    border: solid 1px rgb(128, 128, 128);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
  }
  .totals--main {
    border: 2px solid #1f43b8;
  }
  .totals__heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
  }
  .totals__time {
    font-size: 32px;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 768px) {
    .main {
      margin: 0px 5% 0px 5%;
    }
    .main__header {
      margin-top: 10px;
    }
    .totals {
      align-items: center;
      justify-content: center;
    }
    .tags {
      justify-content: center;
    }
  }
  @media only screen and (max-width: 425px) {
    .totals__item {
      width: 100%;
    }
  }
  @media only screen and (max-width: 320px) {
  }
</style>
