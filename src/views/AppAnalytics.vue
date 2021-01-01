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
        <AppAnalyticsTagTotals title="Tag" :tags="allTags" />
        <AppAnalyticsTagTotals title="Project" :tags="allProjects" />
      </div>
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import MobileNav from '../components/MobileNav';
  import AppAnalyticsTagTotals from '../components/AppAnalyticsTagTotals';
  export default {
    name: 'AppAnalytics',
    components: {
      SideNavigationBar,
      MobileNav,
      AppAnalyticsTagTotals,
    },
    computed: {
      allTags() {
        return this.$store.getters.getAllTags;
      },
      allProjects() {
        return this.$store.getters.getAllProjects;
      },
      categoryTotals() {
        return this.$store.getters.getCategoryTotals;
      },
    },
    created() {
      this.$store.dispatch('getCategoryTotals');
      if (this.allTags.length == 0 && this.allProjects.length == 0) {
        this.$store.dispatch('fetchAllTags');
        this.$store.dispatch('fetchAllProjects');
      }
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
  }
  @media only screen and (max-width: 425px) {
    .totals__item {
      width: 100%;
    }
  }
  @media only screen and (max-width: 320px) {
  }
</style>
