<template>
  <div id="settings-edit-mask">
    <div id="settings-edit-inner">
      <h1>Add a new {{ type }}</h1>
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          id="input"
          name="input"
          v-model="value"
          @keyup="remainingCharCount()"
        /><br />
        <p>{{ remainingChars }} characters left</p>
        <InputErrorMessage v-if="errorMessage" :message="errorMessage" />
        <div id="cancel" class="button" @click="$emit('close')">Cancel</div>
        <input class="button" id="submit" type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
  import InputErrorMessage from './InputErrorMessage';
  import { inputValidation } from '../globalFunctions/inputValidation';
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
  #settings-edit-mask {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.623);
  }
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
  }
  #settings-edit-inner {
    margin: auto;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 3px;
    width: 400px;
    padding: 40px 40px 60px 40px;
    margin-top: 5%;
  }
  #input {
    width: 100%;
    padding: 5px 10px;
    margin: 8px 0;
    box-sizing: border-box;
    font-size: 18px;
  }
  .button {
    float: right;
    margin-top: 5px;
    margin-bottom: 13px;
    width: 8rem;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  #submit {
    background-color: #1f43b8;
    color: white;
    margin-right: 5px;
  }
  #submit:hover {
    background: #2a54b1;
  }
  #cancel {
    background-color: #ced6e7;
    color: black;
  }
  #cancel:hover {
    background-color: #afb8cc;
  }
</style>
