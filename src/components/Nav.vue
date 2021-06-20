<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/"> VUE-BLOG </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="myNav" class="navbar-menu">
      <div class="navbar-start" v-if="user">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/about">About</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!user">
            <router-link class="button is-primary" to="/signup">
              <strong>Sign up</strong>
            </router-link>
            <router-link class="button is-light" to="/login">
              Log in
            </router-link>
          </div>
          <div class="buttons" v-else>
            <router-link class="button is-link" to="/newpost">
              <span>New post</span>
              <span class="icon is-small"> <i class="fas fa-plus" /></span>
            </router-link>
            <a class="button is-light" @click="logout()">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "../store.js";
export default {
  computed: {
    user() {
      return store.state.user;
    }
  },
  methods: {
    logout() {
      store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
