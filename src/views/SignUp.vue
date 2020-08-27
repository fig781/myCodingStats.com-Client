<template>
  <div id="sign-up">
    <div id="center-container">
      <h1>Create your account</h1>
      <input type="text" placeholder="First Name" /><br />
      <input type="text" placeholder="Last Name" /><br />
      <input type="text" placeholder="Email" /><br />
      <input type="text" placeholder="Password" /><br />
      <button>Sign Up</button><br />
      <router-link to="/">Home</router-link>
      <router-link to="/login">Already have an account?</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignUp',
  };
</script>

<style scoped>
  #sign-up {
    height: 100vh;
    display: flex;
  }
  #center-container {
    margin: auto;
    text-align: center;
  }
</style>
