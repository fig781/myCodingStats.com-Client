<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'InputErrorMessage',
    props: {
      message: String,
    },
  };
</script>

<style scoped>
  p {
    color: red;
  }
</style>
