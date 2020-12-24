<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      this.$store.dispatch('autoLogin');
    },
  };
</script>
<style>
  * {
    margin: 0px;
    padding: 0px;
  }
  html,
  body {
    box-sizing: border-box;
    position: relative;
    background-color: #f0f3f6;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
