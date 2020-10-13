<template>
  <div id="settings-edit-mask">
    <div id="settings-edit-inner">
      <button @click="$emit('close')">X</button>
      <h2>Add a new {{ type }}</h2>
      <form @submit.prevent="onSubmit">
        <input type="text" id="input" name="input" v-model="value" /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppSettingsEdit',
    data() {
      return {
        value: '',
      };
    },
    props: {
      type: String,
    },
    methods: {
      onSubmit() {
        if (this.type == 'Tag') {
          this.$store.dispatch('addTag', this.value);
        }

        this.$emit('close');
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
