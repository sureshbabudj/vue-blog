<template>
  <div class="container">
    <form novalidate @submit.prevent="postUser" class="signup">
      <div class="field">
        <label class="label">Name</label>
        <div class="control has-icons-left has-icons-right">
          <input
            :class="[
              !formSubmitted ? 'is-primary' : 'is-success',
              formSubmitted && errors?.name?.error && 'is-danger',
              'input'
            ]"
            type="text"
            placeholder="Enter Name"
            v-model="user.name"
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right" v-if="formSubmitted">
            <i v-if="errors?.name?.error" class="fas fa-exclamation-triangle" />
            <i v-else class="fas fa-check" />
          </span>
          <p class="help is-danger" v-if="formSubmitted && errors?.name?.error">
            {{ errors?.name?.msg }}
          </p>
        </div>
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
            <i
              v-if="errors?.email?.error"
              class="fas fa-exclamation-triangle"
            />
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
        <p
          class="help is-danger"
          v-if="formSubmitted && errors?.password?.error"
        >
          {{ errors?.password?.msg }}
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" type="submit">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script src="./Signup.js"></script>
<style src="./Signup.css" scoped></style>
