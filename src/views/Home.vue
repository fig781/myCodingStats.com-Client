<template>
  <div id="home">
    <div id="landing">
      <div id="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/gridview">App</router-link>
        <router-link class="right-nav" to="/login">Sign In</router-link>
        <router-link class="right-nav" to="/register">Sign Up</router-link>
      </div>
      <div id="center-landing">
        <h1>Track your coding time with this app</h1>
        <router-link to="/login">Sign In</router-link>
        <router-link to="/register">Sign Up</router-link>
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
