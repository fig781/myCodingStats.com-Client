<template>
  <div>
    <SideNavigationBar />
    <MobileNav />
    <div class="main">
      <h1 class="main__header">My Coding Stats</h1>
      <div class="totals-container">
        <div class="totals-container__item totals-container--main">
          <p class="totals-container__heading">Total Coding Time</p>
          <p class="totals-container__time">200hr 15min</p>
        </div>
        <div class="totals-container__item">
          <p class="totals-container__heading">Total Active Learning Time</p>
          <p class="totals-container__time">200hr 15min</p>
        </div>
        <div class="totals-container__item">
          <p class="totals-container__heading">Total Passive Learning Time</p>
          <p class="totals-container__time">200hr 15min</p>
        </div>
        <div class="totals-container__item">
          <p class="totals-container__heading">Total Coding Challenges Time</p>
          <p class="totals-container__time">200hr 15min</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import MobileNav from '../components/MobileNav';
  export default {
    name: 'AppAnalytics',
    components: {
      SideNavigationBar,
      MobileNav,
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
  .totals-container {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .totals-container__item {
    text-align: center;
    padding: 15px;
    border-radius: 5px;
    margin: 5px;
    border: solid 1px rgb(128, 128, 128);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
  }
  .totals-container--main {
    border: 2px solid #1f43b8;
  }
  .totals-container__heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
  }
  .totals-container__time {
    font-size: 32px;
  }

  @media only screen and (max-width: 768px) {
    .main {
      margin: 0px 5% 0px 5%;
    }
    .main__header {
      margin-top: 10px;
    }
    .totals-container {
      align-items: center;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 425px) {
    .totals-container__item {
      width: 100%;
    }
  }
  @media only screen and (max-width: 320px) {
  }
</style>
