<template>
  <form novalidate @submit.prevent="login">
    <div class="notification is-danger" v-if="loginError">
      <button class="delete" @click="loginError = false"></button>
      Email or Password is wrong!
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          :class="[
            !formSubmitted ? 'is-primary' : 'is-success',
            formSubmitted && errors?.email?.error && 'is-danger',
            'input'
          ]"
          type="email"
          placeholder="Enter Email"
          v-model="user.email"
          required
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right" v-if="formSubmitted">
          <i v-if="errors?.email?.error" class="fas fa-exclamation-triangle" />
          <i v-else class="fas fa-check" />
        </span>
      </div>
      <p class="help is-danger" v-if="formSubmitted && errors?.email?.error">
        {{ errors?.email?.msg }}
      </p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right">
        <input
          :class="[
            !formSubmitted ? 'is-primary' : 'is-success',
            formSubmitted && errors?.password?.error && 'is-danger',
            'input'
          ]"
          type="password"
          placeholder="Enter Password"
          v-model="user.password"
          required
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
        <span class="icon is-small is-right" v-if="formSubmitted">
          <i
            v-if="errors?.password?.error"
            class="fas fa-exclamation-triangle"
          />
          <i v-else class="fas fa-check" />
        </span>
      </div>
      <p class="help is-danger" v-if="formSubmitted && errors?.password?.error">
        {{ errors?.password?.msg }}
      </p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary" type="submit">Login</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Signup from "@/views/Signup.vue";

@Options({})
export default class Login extends Signup {
  user = {
    email: "",
    password: ""
  };

  loginError = false;

  async login(): Promise<void> {
    this.formSubmitted = true;
    if (this.isError()) {
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3434/users?email=${this.user.email}&password=${this.user.password}`
      );
      const data = await res.json();
      console.log(data);
      if (!data.length) {
        this.loginError = true;
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(data[0]));
      this.user = {
        email: "",
        password: ""
      };
      this.$router.replace("/");
    } catch (error) {
      console.error(`error: ${error}`);
    }
  }
}
</script>

<style scoped>
form {
  margin: 0 auto;
  max-width: 25rem;
}
</style>
