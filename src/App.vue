<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
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
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f6f6f6;
  }
</style>
