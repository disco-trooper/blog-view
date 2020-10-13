<template>
  <form action="" class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Login</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Username">
        <b-input
          id="username"
          name="username"
          type="type"
          v-model="username"
          required
        >
        </b-input>
      </b-field>
      <b-field
        label="Password"
        :message="hasError ? 'Invalid login credentials' : ''"
        :type="{ 'is-danger': hasError }"
      >
        <b-input
          id="password"
          name="password"
          type="password"
          v-model="password"
          password-reveal
          required
        >
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button
        type="submit"
        class="button is-primary"
        @click.prevent="loginUser"
      >
        Login
      </button>
      <button class="button" type="button" @click="$emit('close')">
        Close
      </button>
    </footer>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  props: ['canCancel'],
  data: () => ({ username: '', password: '', hasError: null }),
  methods: {
    async loginUser() {
      try {
        let res = await axios.post(
          'https://disco-blog-api.herokuapp.com/user/login',
          { username: this.username, password: this.password }
        );
        this.$emit('close');
        localStorage.setItem('token', res.data.token);
        location.reload();
        this.username = '';
        this.password = '';
        this.hasError = null;
      } catch (error) {
        this.hasError = true;
        console.log(error);
      }
    },
  },
};
</script>
