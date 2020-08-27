<template>
  <div id="sign-in">
    <div id="center-container">
      <h1>Sign into your account</h1>
      <input type="text" placeholder="Email" /><br />
      <input type="text" placeholder="Password" /><br />
      <button>Sign In</button><br />
      <router-link to="/">Home</router-link>
      <router-link to="/register">Don't have an account?</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignIn',
  };
</script>

<style scoped>
  #sign-in {
    height: 100vh;
    display: flex;
  }
  #center-container {
    margin: auto;
    text-align: center;
  }
</style>
