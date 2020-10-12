<template>
  <div id="app">
    <Navbar @show-posts="showPosts = true" />
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    <div
      v-if="showPosts"
      @click="
        showPosts = false;
        $emit('get-comments');
      "
    >
      <router-link
        class="router-link"
        :to="post._id"
        v-for="(post, index) in posts"
        :key="index"
        ><blog-post-preview :post="post"></blog-post-preview>
      </router-link>
    </div>
    <router-view v-if="!showPosts" :key="$route.params.id" />
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import BlogPostPreview from './components/BlogPostPreview';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  data: () => ({
    posts: null,
    showPosts: true,
    isLoading: true,
  }),
  watch: {
    // Change state when user goes back
    $route(to) {
      if (to.path === '/') this.showPosts = true;
    },
  },
  components: { BlogPostPreview, Navbar },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do, YYYY');
    },
    log() {
      console.log('logging');
    },
  },
  async mounted() {
    const vm = this;
    let toast;
    setTimeout(() => {
      if (!vm.posts)
        toast = this.$buefy.toast.open({
          message: `Starting up Heroku`,
          position: 'is-bottom',
          duration: 3000,
        });
    }, 2000);

    let posts;
    // Gets all posts and their author's name
    try {
      const response = await axios.get(
        'https://disco-blog-api.herokuapp.com/posts/'
      );
      posts = response.data;
      // Asigns author's name to each post
      posts.forEach(async (post) => {
        const response = await axios.get(
          'https://disco-blog-api.herokuapp.com/user/' + post.author
        );
        // Assign author name to all posts with same author (bypasses fetching for every post)
        posts.forEach((postDeeper) => {
          if (post.author === postDeeper.author) {
            vm.$set(postDeeper, 'authorName', response.data.fullname);
          }
        });
        vm.$set(post, 'authorName', response.data.fullname);
      });
      this.posts = posts.reverse();
      this.isLoading = false;
      if (this.post) toast.close();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.router-link {
  max-width: 400px;
  display: inline-block;
  box-sizing: border-box;
}

div.card {
  .post-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
