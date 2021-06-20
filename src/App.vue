<template>
  <Nav />
  <div class="container" id="contentWrap">
    <router-view />
  </div>
  <Footer />
</template>
<script>
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Nav,
    Footer
  }
};
</script>
<style lang="scss" src="./App.scss" />
