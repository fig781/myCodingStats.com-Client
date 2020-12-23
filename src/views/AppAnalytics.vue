<template>
  <div>
    <SideNavigationBar />
    <MobileNav />
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import MobileNav from '../components/MobileNav';
  export default {
    name: 'AppAnalytics',
    components: {
      SideNavigationBar,
      MobileNav,
    },
  };
</script>

<style scoped></style>
