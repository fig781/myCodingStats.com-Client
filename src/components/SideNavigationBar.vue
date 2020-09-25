<template>
  <div id="side-navigation-bar">
    <button>
      <router-link to="/">Home</router-link>
    </button>

    <button>
      <router-link to="{ name: 'GridView', params: { id: user.userId }}"
        >Grid</router-link
      >
    </button>

    <div id="bottom-container">
      <button>
        <router-link to="/">Profile</router-link>
      </button>
      <button>
        <router-link to="{ name: 'Settings', params: { id: user.userId }}"
          >Settings</router-link
        >
      </button>
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
    mounted() {
      console.log(this.user);
    },
  };
</script>

<style>
  #side-navigation-bar {
    height: 100%;
    width: 7rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #5f7bb6;
    overflow-x: hidden;
    padding-top: 1.5rem;
  }

  #side-navigation-bar button {
    display: block;
    margin: auto;
    margin-bottom: 3rem;
  }

  #bottom-container {
    position: absolute;
    bottom: 0;
    left: 1.8rem;
    margin: auto;
  }
</style>
