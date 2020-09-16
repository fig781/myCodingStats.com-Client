<template>
  <div id="home">
    <div id="landing">
      <div id="navbar">
        <router-link to="/">Home</router-link>
        <router-link class="right-nav" to="/login" v-if="!loggedIn"
          >Sign In</router-link
        >
        <router-link class="right-nav" to="/register" v-if="!loggedIn"
          >Sign Up</router-link
        >

        <button class="right-nav" v-if="loggedIn" @click="logout">
          Logout
        </button>
        <p class="right-nav" v-if="loggedIn">
          {{ user.firstName }} {{ user.lastName }}
        </p>
      </div>
      <div id="center-landing">
        <h1>Track your coding time with this app</h1>
        <router-link to="/login" v-if="!loggedIn">Sign In</router-link>
        <router-link to="/register" v-if="!loggedIn">Sign Up</router-link>
        <router-link
          :to="{ name: 'GridView', params: { id: user.userId } }"
          v-if="loggedIn"
          >App</router-link
        >
      </div>
    </div>
    <div id="descriptions">
      other cool stuff here
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'Home',
    data() {
      return {
        loggedIn: false,
      };
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.loggedIn = false;
      },
    },
    computed: {
      user() {
        return this.$store.getters.loggedInUser;
      },
    },
    mounted() {
      if (
        this.user.userId != null &&
        this.user.firstName != null &&
        this.user.lastName != null
      ) {
        this.loggedIn = true;
      }
    },
  };
</script>

<style scoped>
  #landing {
    background: linear-gradient(
      113deg,
      rgba(95, 123, 182, 1) 0%,
      rgba(127, 103, 214, 1) 100%
    );
    height: 100vh;
  }

  #navbar {
    padding: 2rem;
    background-color: whitesmoke;
  }

  .right-nav {
    float: right;
  }
  #center-landing {
    padding-left: 18%;
    padding-top: 25vh;
  }
</style>
