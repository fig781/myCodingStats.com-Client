<template>
  <div id="home">
    <div id="landing">
      <div id="navbar">
        <div id="left-nav">
          <div id="logo">
            <router-link to="/">My Coding Stats</router-link>
          </div>
          <div
            id="app-button"
            class="nav-button"
            v-if="loggedIn"
            @click="
              $router.push({ name: 'GridView', params: { id: user.userId } })
            "
          >
            Go To App
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
            <InputErrorMessage
              class="error"
              :message="firstNameErrorMessage"
              v-if="firstNameErrorMessage"
            />
            <input
              class="text-input"
              type="text"
              placeholder="First Name"
              v-model="formData.firstName"
            /><br />
            <InputErrorMessage
              class="error"
              :message="lastNameErrorMessage"
              v-if="lastNameErrorMessage"
            />
            <input
              class="text-input"
              type="text"
              placeholder="Last Name"
              v-model="formData.lastName"
            /><br />
            <InputErrorMessage
              class="error"
              :message="emailErrorMessage"
              v-if="emailErrorMessage"
            />
            <input
              class="text-input"
              type="text"
              placeholder="Email"
              v-model="formData.email"
            /><br />
            <InputErrorMessage
              class="error"
              :message="passwordErrorMessage"
              v-if="passwordErrorMessage"
            />
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
  import InputErrorMessage from '../components/InputErrorMessage';
  import { inputValidation } from '../globalFunctions/inputValidation';
  export default {
    name: 'Home',
    components: {
      InputErrorMessage,
    },
    data() {
      return {
        loggedIn: false,
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        firstNameErrorMessage: '',
        lastNameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
      };
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.loggedIn = false;
      },
      async onSubmit() {
        this.firstNameErrorMessage = '';
        this.lastNameErrorMessage = '';
        this.emailErrorMessage = '';
        this.passwordErrorMessage = '';

        const firstNameEmpty = inputValidation.checkIfInputEmpty(
          this.formData.firstName
        );
        const lastNameEmpty = inputValidation.checkIfInputEmpty(
          this.formData.lastName
        );
        const emailEmpty = inputValidation.checkIfInputEmpty(
          this.formData.email
        );
        const passwordEmpty = inputValidation.checkIfInputEmpty(
          this.formData.password
        );

        const firstNameToolong = inputValidation.checkIfInputTooLong(
          this.formData.firstName,
          40
        );
        const lastNameTooLong = inputValidation.checkIfInputTooLong(
          this.formData.lastName,
          40
        );
        const emailToolong = inputValidation.checkIfInputTooLong(
          this.formData.email,
          40
        );
        const passwordTooLong = inputValidation.checkIfInputTooLong(
          this.formData.password,
          40
        );

        if (firstNameEmpty) {
          this.firstNameErrorMessage = 'First name empty';
        } else if (firstNameToolong) {
          this.firstNameErrorMessage = 'First name too long';
        }

        if (lastNameEmpty) {
          this.lastNameErrorMessage = 'Last name empty';
        } else if (lastNameTooLong) {
          this.lastNameErrorMessage = 'Last name too long';
        }

        if (emailEmpty) {
          this.emailErrorMessage = 'Email empty';
        } else if (emailToolong) {
          this.emailErrorMessage = 'Email too long';
        }

        if (passwordEmpty) {
          this.passwordErrorMessage = 'Password empty';
        } else if (passwordTooLong) {
          this.passwordErrorMessage = 'Password too long';
        }

        if (
          this.emailErrorMessage == '' &&
          this.passwordErrorMessage == '' &&
          this.firstNameErrorMessage == '' &&
          this.lastNameErrorMessage == ''
        ) {
          const response = await this.$store.dispatch('signUp', this.formData);

          if (response) {
            if (response.type == 'email') {
              this.emailErrorMessage = response.response;
            }
            if (response.type == 'password') {
              this.passwordErrorMessage = response.response;
            }
            if (response.type == 'firstName') {
              this.firstNameErrorMessage = response.response;
            }
            if (response.type == 'lastName') {
              this.lastNameErrorMessage = response.response;
            }
          }
        }
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
    min-height: 100vh;
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
    grid-template-columns: 1fr 300px;
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
    width: 300px;
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
  .error {
    text-align: left;
    margin-bottom: 2px;
  }
  .text-input {
    border: 1px solid lightgrey;
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 2px;
    margin-bottom: 10px;
    width: 100%;
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
    width: 100%;
  }
  #signup-button:hover {
    background: #2a54b1;
  }

  @media only screen and (max-width: 1000px) {
    #main-container {
      display: block;
      text-align: center;
      margin-right: 8%;
      margin-left: 8%;
    }
    #left-container {
      margin: 30px auto 30px auto;
    }
    #right-container {
      margin: 0px auto 50px auto;
    }
  }
  @media only screen and (max-width: 700px) {
    #navbar {
      padding: 3rem 2rem 0rem 2rem;
    }
  }
  @media only screen and (max-width: 500px) {
    #main-container {
      margin-right: 1%;
      margin-left: 1%;
    }
    #navbar {
      padding: 3rem 2rem 0rem 2rem;
      display: block;
    }
    #right-nav {
      justify-content: center;
      margin-top: 15px;
    }
    #left-container h1 {
      font-size: 30px;
    }
  }
</style>
