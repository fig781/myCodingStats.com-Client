<template>
  <div id="sign-in">
    <div id="center-container">
      <h1>Sign into your account</h1>
      <form @submit.prevent="onSubmit">
        <input
          type="email"
          placeholder="Email"
          v-model="formData.email"
        /><br />
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password"
        /><br />
        <input type="submit" value="Submit" /><br />
      </form>

      <router-link to="/">Home</router-link>
      <router-link to="/register">Don't have an account?</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignIn',
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('signIn', this.formData);
      },
    },
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
