<template>
  <div id="side-navigation-bar">
    <div id="top-container">
      <div id="home-button">
        <router-link to="/">
          <img
            src="../assets/house-black-silhouette-without-door.png"
            alt="Home"
          />
        </router-link>
      </div>

      <router-link :to="{ name: 'GridView', params: { id: user.userId } }"
        ><img src="../assets/listing-option.png" alt="List"
      /></router-link>
    </div>

    <div id="bottom-container">
      <router-link :to="{ name: 'Settings', params: { id: user.userId } }"
        ><img src="../assets/settings (1).png" alt="Settings"
      /></router-link>
      <p>v0.1</p>
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
  #side-navigation-bar {
    height: 100%;
    width: 5rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #1f43b8;
    overflow-x: hidden;
    padding-top: 1.5rem;
  }

  #home-button {
    margin-bottom: 2rem;
  }
  img {
    max-height: 28px;
    max-width: 28px;
  }

  #top-container {
    width: 36%;
    margin: 0 auto;
  }

  #bottom-container {
    position: fixed;
    bottom: 0.5rem;
    left: 1.5rem;
  }
  p {
    text-align: center;
    margin-top: 15px;
    color: white;
    font-size: 12px;
  }

  @media only screen and (max-width: 768px) {
    #side-navigation-bar {
      display: none;
    }
  }
</style>
