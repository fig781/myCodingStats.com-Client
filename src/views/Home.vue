<template>
  <main>
    <header class="nav">
      <div class="nav-inner">
        <div class="nav-left">
          <div class="logo">
            <router-link to="/"><h1>myCodingStats</h1> </router-link>
          </div>
          <button
            class="app-btn nav-btn"
            v-if="loggedIn"
            @click="$router.push({ name: 'GridView', params: { id: user.userId } })"
          >
            Go To App
          </button>
        </div>

        <div class="nav-right">
          <button
            class="nav-btn sign-in"
            v-if="!loggedIn"
            @click="$router.push('login')"
          >
            Sign In
          </button>
          <button
            class="nav-btn sign-up"
            v-if="!loggedIn"
            @click="$router.push('register')"
          >
            Sign Up
          </button>
          <p v-if="loggedIn">{{ user.firstName }} {{ user.lastName }}</p>
          <button class="nav-btn logout-btn" v-if="loggedIn" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </header>

    <section class="mid">
      <div class="mid-text">
        <h1>This website tracks your coding time.</h1>
        <h2>
          We make it easy to track your coding time so you can go from zero to hero
          in no time.
        </h2>
      </div>
      <div class="create-account-container">
        <div class="create-account" v-if="!loggedIn">
          <div class="create-account-head">
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
              placeholder="Username"
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

            <button id="signup-button" type="submit" name="submit" @click="onSubmit">
              <Loader v-if="loading" />
              <p v-if="!loading">Sign Up</p>
            </button>
          </form>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>
        Made by Aden Eilers
        <a target="_blank" href="https://github.com/fig781/myCodingStats.com-Client"
          >Github</a
        >
      </p>
    </footer>
  </main>
</template>

<script>
  import InputErrorMessage from '../components/InputErrorMessage';
  import { inputValidation } from '../globalFunctions/inputValidation';
  import Loader from '../components/Loader';

  export default {
    name: 'Home',
    components: {
      InputErrorMessage,
      Loader,
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
        loading: false,
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
        const emailEmpty = inputValidation.checkIfInputEmpty(this.formData.email);
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
          this.emailErrorMessage = 'Username empty';
        } else if (emailToolong) {
          this.emailErrorMessage = 'Username too long';
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
          this.loading = true;
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
        this.loading = false;
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

  main {
    background: linear-gradient(113deg, rgb(89, 60, 194) 0%, rgb(17, 69, 182) 100%);
    height: 100%;
    color: white;
  }

  /* NAVBAR */
  .nav {
    max-width: 1320px;
    width: 100%;
    padding: 40px 0px;
    margin: 0 auto;
  }

  .nav-inner {
    display: flex;
    justify-content: space-between;
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .logo h1 {
    font-size: 30px;
    font-weight: 600;
  }

  .logo a {
    color: white;
  }

  .app-btn {
    background-color: white;
    margin-left: 30px;
    color: var(--clr-font-secondary);
    border: solid 1px transparent;
  }

  .app-btn:hover {
    border: solid 1px #eef0ff;
    background-color: #eef0ff;
  }

  .nav-right {
    display: flex;
  }

  .nav-right p {
    margin: auto;
    font-size: 20px;
    padding-right: 15px;
  }
  .nav-btn {
    padding: 10px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
  }
  .sign-up {
    background-color: white;
    color: var(--clr-font-secondary);
    border: solid 1px transparent;
  }
  .sign-up:hover {
    border: solid 1px #eef0ff;
    background-color: #eef0ff;
  }
  .sign-in {
    border: solid 1px white;
    margin-right: 10px;
    background: transparent;
    color: white;
  }
  .sign-in:hover {
    color: var(--clr-bg);
    border: solid 1px rgb(209, 209, 209);
  }

  .logout-btn {
    color: white;
    background-color: transparent;
    border: solid 1px white;
  }
  .logout-btn:hover {
    color: var(--clr-font-secondary);
    background-color: white;
  }

  /* MIDDLE HERO */
  .mid {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 123px - 48px);
    margin: 0 15px;
  }
  .mid-text {
    max-width: 650px;
    padding: 0 15px;
    white-space: normal;
  }
  .mid-text h1 {
    font-size: 3.3rem;
    font-family: var(--ft-header);
    margin-bottom: 15px;
    letter-spacing: 2px;
  }
  .mid-text h2 {
    font-weight: 400;
    font-family: var(--ft-body);
    letter-spacing: 1px;
  }

  /* CREATE ACCOUNT WIDGET */
  .create-account {
    text-align: center;
    border-radius: 6px;
    background-color: #f6f8fa;
    width: 300px;
  }

  .create-account-head {
    background-color: rgb(235, 235, 235);
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    border-radius: 6px 6px 0px 0px;
    color: black;
  }
  .create-account-head h2 {
    font-weight: normal;
  }

  form {
    padding: 20px;
  }

  .error {
    text-align: left;
    margin-bottom: 2px;
  }
  .text-input {
    border: 1px solid lightgrey;
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 6px;
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
    text-align: center;
    background-color: #1f43b8;
    color: white;
    width: 100%;
    cursor: pointer;
  }
  #signup-button:hover {
    background: #2a54b1;
  }

  /* FOOTER */
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }

  .footer a {
    text-decoration: underline;
    color: var(--clr-bg);
  }

  @media only screen and (max-width: 1440px) {
    .nav {
      padding: 40px 70px;
    }
  }

  /* @media only screen and (max-width: 1024px) {
    
  } */
  @media only screen and (max-width: 768px) {
    main {
      height: 100%;
    }

    .mid {
      height: 750px;
    }

    .nav-inner {
      flex-direction: column;
    }

    .nav-left {
      flex-direction: column;
      padding-bottom: 15px;
    }

    .logo {
      padding-bottom: 15px;
    }

    .nav-btn {
      width: 200px;
    }

    .app-btn {
      margin: 0;
    }
    .nav-right {
      flex-direction: column-reverse;
      align-items: center;
    }

    .logout-btn {
      margin-bottom: 15px;
    }

    .sign-in {
      margin: 0;
    }

    .sign-up {
      margin-bottom: 15px;
    }

    .mid {
      flex-direction: column;
      text-align: center;
      justify-content: start;
    }

    .mid-text {
      padding-bottom: 40px;
    }
  }
  @media only screen and (max-width: 425px) {
    .mid-text h1 {
      font-size: 2rem;
    }
  }
  /* @media only screen and (max-width: 375px) {
    
  } */
</style>
