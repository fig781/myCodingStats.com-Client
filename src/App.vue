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
    height: 100%;
    position: relative;
    background-color: #f5f5f5ee;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
