<template>
  <div class="mobile-nav">
    <h2 class="mobile-nav__header" @click="$router.push({ name: 'Home' })">
      myCodingStats
    </h2>

    <img
      class="nav-img mobile-nav__hamburger"
      src="../assets/menu.png"
      alt="Menu"
      @click="displayOptions = !displayOptions"
    />
    <transition name="alter">
      <div class="options" v-if="displayOptions" v-on-clickaway="away">
        <div
          class="options__selection"
          @click="
            $router.push({ name: 'GridView', params: { id: user.userId } })
          "
        >
          <img class="nav-img" src="../assets/listing-option.png" alt="table" />
          <p class="options__text">Table</p>
        </div>
        <div
          class="options__selection"
          @click="
            $router.push({ name: 'Analytics', params: { id: user.userId } })
          "
        >
          <img class="nav-img" src="../assets/bar-chart.png" alt="analytics" />
          <p class="options__text">Analytics</p>
        </div>
        <div
          class="options__selection"
          @click="
            $router.push({ name: 'Settings', params: { id: user.userId } })
          "
        >
          <img
            class="nav-img"
            src="../assets/settings (1).png"
            alt="settings"
          />
          <p class="options__text">Settings</p>
        </div>
        <div class="options__version">v1.0</div>
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
  .mobile-nav {
    background-color: #1f43b8;
    padding: 8px 0px 8px 0px;
    display: flex;
    justify-content: space-between;
  }
  .mobile-nav__hamburger {
    margin-right: 5%;
    border-radius: 10px;
    padding: 0px 3px 0px 3px;
  }
  .mobile-nav__header {
    margin-left: 5%;
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  .nav-img {
    height: 32px;
    width: 32px;
  }
  .nav-img:active {
    background-color: rgba(255, 255, 255, 0.185);
  }

  .options {
    z-index: 99;
    background-color: #1f43b8;
    position: absolute;
    top: 47px;
    right: 0px;
    padding: 20px;
    border-radius: 0px 0px 0px 6px;
  }
  .options__selection {
    display: flex;
    border-radius: 6px;
  }
  .options__selection:active {
    background-color: rgba(255, 255, 255, 0.048);
  }
  .options__text {
    font-size: 30px;
    color: white;
    margin-bottom: 15px;
    margin-left: 10px;
  }
  .options__version {
    color: white;
    text-align: right;
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

  @media only screen and (min-width: 768px) {
    .mobile-nav {
      display: none;
    }
  }
</style>
