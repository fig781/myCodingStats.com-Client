<template>
  <div id="home">
    <div id="landing">
      <div id="navbar">
        <div id="left-nav">
          <div id="logo">
            <router-link to="/">My Coding Stats</router-link>
          </div>
          <div id="app-button" class="nav-button" v-if="loggedIn">
            <router-link :to="{ name: 'GridView', params: { id: user.userId } }"
              >Go To App</router-link
            >
          </div>
        </div>

        <div id="right-nav">
          <div
            class="nav-button sign-in"
            v-if="!loggedIn"
            @click="$router.push('login')"
          >
            Sign In
          </div>
          <div
            class="nav-button sign-up"
            v-if="!loggedIn"
            @click="$router.push('register')"
          >
            Sign Up
          </div>
          <p v-if="loggedIn">{{ user.firstName }} {{ user.lastName }}</p>
          <div class="nav-button" id="logout" v-if="loggedIn" @click="logout">
            Logout
          </div>
        </div>
      </div>
      <div id="main-container">
        <div id="left-container">
          <h1>This app tracks your coding time</h1>
          <h2>
            We make it easy to track your coding time so you can go from zero to
            hero in no time.
          </h2>
        </div>
        <div id="right-container" v-if="!loggedIn">
          <div id="header">
            <h2>Create Your Account</h2>
          </div>
          <form @submit.prevent="onSubmit">
            <input
              class="text-input"
              type="text"
              placeholder="First Name"
              v-model="formData.firstName"
            /><br />
            <input
              class="text-input"
              type="text"
              placeholder="Last Name"
              v-model="formData.lastName"
            /><br />
            <input
              class="text-input"
              type="email"
              placeholder="Email"
              v-model="formData.email"
            /><br />
            <input
              class="text-input"
              type="password"
              placeholder="Password"
              v-model="formData.password"
            /><br />
            <input
              id="signup-button"
              type="submit"
              value="Sign Up"
              name="submit"
            /><br />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //<div id="descriptions">
  //      other cool stuff here
  //    </div>
  export default {
    name: 'Home',
    data() {
      return {
        loggedIn: false,
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.loggedIn = false;
      },
      async onSubmit() {
        this.$store.dispatch('signUp', this.formData);
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
  /* HERO */
  #landing {
    background: linear-gradient(
      113deg,
      rgb(89, 60, 194) 0%,
      rgb(17, 69, 182) 100%
    );
    height: 100vh;
    color: white;
  }
  /* NAVBAR */
  #navbar {
    padding: 3rem 7rem 0rem 7rem;
    display: flex;
    justify-content: space-between;
  }
  #left-nav {
    display: flex;
  }
  #logo {
    font-size: 30px;
    font-weight: 600;
    margin: auto;
  }
  #logo a {
    color: white;
    text-decoration: none;
  }
  #app-button {
    background-color: white;
    margin-left: 30px;
  }
  #app-button a {
    text-decoration: none;
    color: #1f43b8;
  }
  #right-nav {
    display: flex;
  }
  #right-nav p {
    margin: auto;
    font-size: 20px;
    padding-right: 15px;
  }
  .nav-button {
    padding: 10px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
  }
  .sign-up {
    background-color: white;
    color: #1f43b8;
  }
  .sign-in {
    border: solid 1px white;
    background-color: rgba(178, 34, 34, 0);
    margin-right: 10px;
  }
  #logout {
    background-color: rgba(178, 34, 34, 0);
    border: solid 1px white;
  }

  /* MIDDLE HERO */
  #main-container {
    display: grid;
    grid-template-columns: 1fr 340px;
    grid-template-rows: auto;
    margin-right: 18%;
    margin-left: 18%;
    position: relative;
    align-items: center;
    height: 80%;
  }
  #left-container {
    max-width: 650px;
  }
  #left-container h1 {
    font-size: 55px;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 15px;
    letter-spacing: 2px;
  }
  #left-container h2 {
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 1px;
  }

  #right-container {
    text-align: center;
    border-radius: 6px;
    background-color: #f6f8fa;
  }

  #header {
    background-color: rgb(235, 235, 235);
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    border-radius: 6px 6px 0px 0px;
    color: black;
  }
  #header h2 {
    font-weight: normal;
  }

  form {
    padding: 20px;
    margin: auto;
  }
  .text-input {
    border: 1px solid lightgrey;
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 2px;
    margin-bottom: 10px;
    width: 80%;
    box-sizing: border-box;
  }
  input:focus {
    border: solid 1px #0069ff;
    outline: #0069ff;
  }
  #signup-button {
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    background-color: #1f43b8;
    color: white;
    width: 80%;
  }
  #signup-button:hover {
    background: #2a54b1;
  }
</style>
