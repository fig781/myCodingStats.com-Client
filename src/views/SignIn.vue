<template>
  <div id="sign-in">
    <div id="center-container">
      <div id="header">
        <h2>Sign Into Your Account</h2>
      </div>

      <form @submit.prevent="onSubmit">
        <InputErrorMessage
          :message="emailErrorMessage"
          v-if="emailErrorMessage"
          class="error"
        />
        <input
          class="text-input"
          type="text"
          placeholder="Email"
          v-model="formData.email"
        /><br />
        <InputErrorMessage
          :message="passwordErrorMessage"
          v-if="passwordErrorMessage"
          class="error"
        />
        <input
          class="text-input"
          type="password"
          placeholder="Password"
          v-model="formData.password"
        /><br />

        <input id="button" type="submit" value="Submit" /><br />
      </form>

      <div id="bottom-container">
        <router-link class="bottom-text" to="/">Home</router-link> |
        <router-link class="bottom-text" to="/register"
          >Don't have an account?</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
  import InputErrorMessage from '../components/InputErrorMessage';
  import { inputValidation } from '../globalFunctions/inputValidation';

  export default {
    name: 'SignIn',
    components: {
      InputErrorMessage,
    },
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
        emailErrorMessage: '',
        passwordErrorMessage: '',
      };
    },
    methods: {
      async onSubmit() {
        this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
        const emailEmpty = inputValidation.checkIfInputEmpty(
          this.formData.email
        );
        const passwordEmpty = inputValidation.checkIfInputEmpty(
          this.formData.password
        );

        const emailToolong = inputValidation.checkIfInputTooLong(
          this.formData.email,
          40
        );
        const passwordTooLong = inputValidation.checkIfInputTooLong(
          this.formData.password,
          40
        );

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

        if (this.emailErrorMessage == '' && this.passwordErrorMessage == '') {
          const response = await this.$store.dispatch('signIn', this.formData);

          if (response && response.type == 'email') {
            this.emailErrorMessage = response.response;
          }
          if (response && response.type == 'password') {
            this.passwordErrorMessage = response.response;
          }
        }
      },
    },
  };
</script>

<style scoped>
  #sign-in {
    height: 100vh;
    display: flex;
    background-color: #1f43b8;
  }
  #header {
    background-color: rgb(235, 235, 235);
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    border-radius: 6px;
  }
  #header h2 {
    font-weight: normal;
  }
  form {
    padding: 20px;
    max-width: 270px;
    margin: auto;
  }
  .error {
    text-align: left;
    margin-bottom: 2px;
  }
  #center-container {
    margin: auto;
    text-align: center;
    border: solid 1px grey;
    border-radius: 6px;
    background-color: #f6f8fa;
  }
  .text-input {
    border: 1px solid black;
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 3px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus {
    border: solid 1px #0069ff;
    outline: #0069ff;
  }

  #button {
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    background-color: #1f43b8;
    color: white;
    width: 100%;
  }
  #button:hover {
    background: #2a54b1;
  }
  #bottom-container {
    padding: 0px 20px 20px 20px;
  }
  .bottom-text {
    color: royalblue;
  }
  .bottom-text:visited {
    color: royalblue;
  }
</style>
