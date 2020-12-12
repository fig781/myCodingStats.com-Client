<template>
  <div id="mobile-nav">
    <img
      id="left"
      class="nav-img"
      src="../assets/house-black-silhouette-without-door.png"
      alt="Home"
      @click="$router.push({ name: 'Home' })"
    />

    <img
      id="right"
      class="nav-img"
      src="../assets/menu.png"
      alt="Menu"
      @click="displayOptions = !displayOptions"
    />
    <transition name="alter">
      <div id="options" v-if="displayOptions" v-on-clickaway="away">
        <div
          class="option"
          @click="
            $router.push({ name: 'GridView', params: { id: user.userId } })
          "
        >
          <img src="../assets/listing-option.png" alt="table" />
          <p>Table</p>
        </div>
        <div
          class="option"
          @click="
            $router.push({ name: 'Settings', params: { id: user.userId } })
          "
        >
          <img src="../assets/settings (1).png" alt="settings" />
          <p>Settings</p>
        </div>
        <div id="version">v0.1</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway';

  export default {
    name: 'MobileNav',

    data() {
      return {
        displayOptions: false,
      };
    },
    directives: {
      onClickaway: onClickaway,
    },
    methods: {
      away: function() {
        this.displayOptions = false;
      },
    },
    computed: {
      user() {
        return this.$store.getters.loggedInUser;
      },
    },
  };
</script>

<style scoped>
  #mobile-nav {
    background-color: #1f43b8;
    padding: 8px 0px 8px 0px;
    display: flex;
    justify-content: space-between;
  }
  .nav-img {
    height: 32px;
    width: 32px;
    border-radius: 10px;
    padding: 0px 3px 0px 3px;
  }
  .nav-img:active {
    background-color: rgba(255, 255, 255, 0.185);
  }
  #right {
    margin-right: 5%;
  }
  #left {
    margin-left: 5%;
  }
  #options {
    z-index: 99;
    background-color: #1f43b8;
    position: absolute;
    top: 47px;
    right: 0px;
    padding: 20px;
    border-radius: 0px 0px 0px 10px;
  }
  .option {
    display: flex;
    border-radius: 10px;
  }
  .option:active {
    background-color: rgba(255, 255, 255, 0.185);
  }
  .option img {
    height: 32px;
    width: 32px;
    margin-right: 10px;
  }
  .option p {
    font-size: 30px;
    color: white;
    margin-bottom: 15px;
  }
  .alter-enter-active,
  .alter-leave-active {
    transition: 250ms;
  }
  .alter-enter {
    opacity: 0;
    transform: translateX(10px);
  }
  .alter-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
  #version {
    color: white;
    text-align: right;
  }

  @media only screen and (min-width: 768px) {
    #mobile-nav {
      display: none;
    }
  }
</style>
