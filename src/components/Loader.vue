<template>
  <div class="loader"></div>
</template>

<script>
  export default {
    name: 'Loader',
  };
</script>

<style>
  @-moz-keyframes loader {
    0% {
      background: #dde2e7;
    }
    10% {
      background: #6b9dc8;
    }
    40% {
      background: #dde2e7;
    }
  }
  @-webkit-keyframes loader {
    0% {
      background: #dde2e7;
    }
    10% {
      background: #6b9dc8;
    }
    40% {
      background: #dde2e7;
    }
  }
  @keyframes loader {
    0% {
      background: #dde2e7;
    }
    10% {
      background: #6b9dc8;
    }
    40% {
      background: #dde2e7;
    }
  }
  .loader:not(:required) {
    -moz-animation: loader 1000ms 300ms infinite ease-out;
    -webkit-animation: loader 1000ms 300ms infinite ease-out;
    animation: loader 1000ms 300ms infinite ease-out;
    background: #dde2e7;
    display: inline-block;
    position: relative;
    text-indent: -9999px;
    width: 0.9em;
    height: 13px;
    margin: 3px 1.6em 0px 1.6em;
  }
  .loader:not(:required):before,
  .loader:not(:required):after {
    background: #dde2e7;
    content: '\x200B';
    display: inline-block;
    width: 0.9em;
    height: 13px;
    position: absolute;
    top: 0;
  }
  .loader:not(:required):before {
    -moz-animation: loader 1000ms 150ms infinite ease-out;
    -webkit-animation: loader 1000ms 150ms infinite ease-out;
    animation: loader 1000ms 150ms infinite ease-out;
    left: -1.6em;
  }
  .loader:not(:required):after {
    -moz-animation: loader 1000ms 450ms infinite ease-out;
    -webkit-animation: loader 1000ms 450ms infinite ease-out;
    animation: loader 1000ms 450ms infinite ease-out;
    right: -1.6em;
  }
</style>
