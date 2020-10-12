<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p class="is-size-5" @click="$emit('show-posts')">Disco's Blog</p>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <a class="button is-light">
          <strong>Log In</strong>
        </a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
