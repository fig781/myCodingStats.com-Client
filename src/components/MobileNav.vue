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
      <div id="options" v-if="displayOptions">
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
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'MobileNav',
    data() {
      return {
        displayOptions: false,
      };
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
  }
  #right {
    padding-right: 5%;
  }
  #left {
    padding-left: 5%;
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
  }
  .option img {
    height: 28px;
    width: 28px;
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

  @media only screen and (min-width: 768px) {
    #mobile-nav {
      display: none;
    }
  }
</style>
