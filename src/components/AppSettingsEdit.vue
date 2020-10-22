<template>
  <div id="settings-edit-mask">
    <div id="settings-edit-inner">
      <button @click="$emit('close')">X</button>
      <h2>Add a new {{ type }}</h2>
      <form @submit.prevent="onSubmit">
        <input type="text" id="input" name="input" v-model="value" /><br />
        <InputErrorMessage v-if="errorMessage" :message="errorMessage" />
        <input type="submit" value="Submit" />
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
      };
    },
    props: {
      type: String,
    },
    components: {
      InputErrorMessage,
    },
    methods: {
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

<style>
  #settings-edit-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #settings-edit-inner {
    max-width: 300px;
    max-height: 500px;
    position: absolute;
    margin: 0px auto;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }
</style>
