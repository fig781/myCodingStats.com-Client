<template>
  <div class="navbar">
    <div class="top-container">
      <img
        class="button"
        src="../assets/house-black-silhouette-without-door.png"
        alt="home"
        @click="$router.push({ name: 'Home' })"
      />
      <img
        class="button"
        src="../assets/listing-option.png"
        alt="List"
        @click="$router.push({ name: 'GridView', params: { id: user.userId } })"
      />
      <img
        class="button"
        src="../assets/bar-chart.png"
        alt="Graph"
        @click="
          $router.push({ name: 'Analytics', params: { id: user.userId } })
        "
      />
    </div>

    <div class="bottom-container">
      <img
        class="button"
        src="../assets/settings (1).png"
        alt="Settings"
        @click="$router.push({ name: 'Settings', params: { id: user.userId } })"
      />
      <p class="bottom-container__version">v1.0</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideNavigationBar',
    computed: {
      user() {
        return this.$store.getters.loggedInUser;
      },
    },
  };
</script>

<style scoped>
  .navbar {
    height: 100%;
    width: 5.1rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #1f43b8;
    overflow-x: hidden;
    padding-top: 1.5rem;
  }
  .top-container {
    width: 36%;
    margin: 0 auto;
  }
  .button {
    max-height: 32px;
    max-width: 32px;
    margin-bottom: 2.5rem;
    cursor: pointer;
  }
  .button:hover {
    filter: invert(1%) sepia(1%) saturate(1%) hue-rotate(1deg) brightness(1000%)
      contrast(60%);
  }
  .bottom-container {
    position: fixed;
    bottom: 0.5rem;
    left: 1.5rem;
  }
  .bottom-container__version {
    text-align: center;
    color: white;
    font-size: 12px;
  }

  @media only screen and (max-width: 768px) {
    .navbar {
      display: none;
    }
  }
</style>
