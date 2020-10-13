<template>
  <b-navbar :mobile-burger="false">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p class="is-size-5" @click="$emit('show-posts')">Disco's Blog</p>
      </b-navbar-item>
    </template>
    <template slot="brand">
      <b-navbar-item tag="div" id="burgerVisible">
        <section>
          <div v-if="!loginToken">
            <button
              class="button is-primary is-outlined"
              @click="isComponentModalActive = true"
            >
              Log In
            </button>
            <b-modal
              v-model="isComponentModalActive"
              has-modal-card
              trap-focus
              :destroy-on-hide="false"
              aria-role="dialog"
              aria-modal
            >
              <template #default="props">
                <login-modal @close="props.close"></login-modal>
              </template>
            </b-modal>
          </div>
          <div v-else>
            <router-link
              @click.native="$emit('hide-posts')"
              to="new"
              class="mr-2 is-primary is-light button"
              >New Post</router-link
            >
            <b-button @click="logOut" type="is-light">
              Log Out
            </b-button>
          </div>
        </section>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LoginModal from './LoginModal';

export default {
  name: 'Navbar',
  components: {
    LoginModal,
  },
  data: () => ({
    isComponentModalActive: false,
    loginProps: {
      usernameProp: '',
      passwordProp: '',
    },
    loginToken: localStorage.getItem('token'),
  }),
  methods: {
    logOut() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>
<style lang="scss">
#burgerVisible {
  margin-left: auto;
}

.navbar-brand {
  width: 100%;
}
</style>
