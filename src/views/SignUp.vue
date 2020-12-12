<template>
  <div id="sign-up">
    <div id="center-container">
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
        <Loader v-if="loading" />
        <input id="button" type="submit" value="Submit" name="submit" /><br />
      </form>
      <div id="bottom-container">
        <router-link class="bottom-text" to="/">Home</router-link>
        |
        <router-link class="bottom-text" to="/login"
          >Already have an account?</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
  import InputErrorMessage from '../components/InputErrorMessage';
  import { inputValidation } from '../globalFunctions/inputValidation';
  import Loader from '../components/Loader';
  export default {
    name: 'SignUp',
    components: {
      InputErrorMessage,
      Loader,
    },
    data() {
      return {
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
  };
</script>

<style scoped>
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
  #sign-up {
    height: 100vh;
    display: flex;
    background-color: #1f43b8;
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
    border-radius: 2px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  input:focus {
    border: solid 1px #0069ff;
    outline: #0069ff;
  }
  .error {
    text-align: left;
    margin-bottom: 2px;
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
