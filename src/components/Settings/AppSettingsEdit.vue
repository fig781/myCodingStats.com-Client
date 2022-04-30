<template>
  <div class="settings-edit-mask">
    <div class="settings-edit-inner">
      <h1 class="settings-edit-inner__header">Add a new {{ type }}</h1>
      <form @submit.prevent="onSubmit">
        <InputErrorMessage v-if="errorMessage" :message="errorMessage" />
        <input
          type="text"
          class="settings-edit-inner__input"
          name="input"
          v-model="value"
          @keyup="remainingCharCount()"
        /><br />
        <p>{{ remainingChars }} characters left</p>
        <div class="button-container">
          <input class="button button--submit" type="submit" value="Submit" />
          <div class="button button--cancel" @click="$emit('close')">
            Cancel
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import InputErrorMessage from '../InputErrorMessage';
  import { inputValidation } from '../../globalFunctions/inputValidation';

  export default {
    name: 'AppSettingsEdit',
    data() {
      return {
        value: '',
        errorMessage: '',
        remainingChars: 50,
      };
    },
    props: {
      type: String,
    },
    components: {
      InputErrorMessage,
    },
    methods: {
      remainingCharCount() {
        const maxChar = 50;
        this.remainingChars = maxChar - this.value.length;
        if (this.remainingChars < 0) {
          this.remainingChars = 0;
        }
      },
      onSubmit() {
        let valueEmpty = inputValidation.checkIfInputEmpty(this.value);
        let valueTooLong = inputValidation.checkIfInputTooLong(this.value, 50);
        if (valueEmpty == true) {
          this.errorMessage = 'Input empty';
          return;
        } else if (valueTooLong == true) {
          this.errorMessage = 'Input is too long, 50 characters max';
          return;
        }

        let activeDuplicateExists = false;
        if (this.type == 'Tag') {
          activeDuplicateExists = inputValidation.checkIfActiveEntryExists(
            this.value,
            this.allTags
          );
          if (activeDuplicateExists == true) {
            this.errorMessage = 'Active tag already exists';
          } else {
            this.$store.dispatch('addTag', this.value);
            this.$emit('close');
          }
        } else if (this.type == 'Project') {
          activeDuplicateExists = inputValidation.checkIfActiveEntryExists(
            this.value,
            this.allProjects
          );
          if (activeDuplicateExists == true) {
            this.errorMessage = 'Active project already exists';
          } else {
            this.$store.dispatch('addProject', this.value);
            this.$emit('close');
          }
        }
      },
    },
    computed: {
      allTags() {
        return this.$store.getters.getAllTags;
      },
      allProjects() {
        return this.$store.getters.getAllProjects;
      },
    },
  };
</script>

<style scoped>
  .settings-edit-mask {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.623);
  }

  .settings-edit-inner {
    margin: auto;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 3px;
    width: 400px;
    padding: 40px 40px 40px 40px;
    margin-top: 20%;
  }

  .settings-edit-inner__header {
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
  }

  .settings-edit-inner__input {
    width: 100%;
    padding: 5px 10px;
    margin: 8px 0;
    font-size: 18px;
    border: solid 1px black;
    border-radius: var(--br-default);
  }

  .settings-edit-inner__input:focus {
    border: solid 1px #0069ff;
    outline: #0069ff;
  }

  .button-container {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
  }
  .button {
    width: 8rem;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }

  .button--submit {
    background-color: #1f43b8;
    color: white;
    margin-right: 5px;
  }

  .button--submit:hover {
    background: #2a54b1;
  }

  .button--cancel {
    background-color: #ced6e7;
    color: black;
  }

  .button--cancel:hover {
    background-color: #afb8cc;
  }

  @media only screen and (max-width: 768px) {
    .settings-edit-inner {
      width: 250px;
      padding: 20px 20px 40px 20px;
    }

    .button-container {
      justify-content: center;
    }
  }
</style>
