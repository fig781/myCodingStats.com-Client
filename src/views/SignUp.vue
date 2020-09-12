<template>
  <div id="sign-up">
    <div id="center-container">
      <h1>Create your account</h1>
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          placeholder="First Name"
          v-model="formData.firstName"
        /><br />
        <input
          type="text"
          placeholder="Last Name"
          v-model="formData.lastName"
        /><br />
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
        <input type="submit" value="Submit" name="submit" /><br />
      </form>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Already have an account?</router-link>
    </div>
  </div>
</template>

<script>
  //import axios from 'axios';
  export default {
    name: 'SignUp',
    data() {
      return {
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async onSubmit() {
        this.$store.dispatch('signUp', this.formData);
      },
    },
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
