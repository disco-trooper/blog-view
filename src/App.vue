<template>
  <div id="app">
    <Navbar @show-posts="showPosts = true" @hide-posts="showPosts = false" />
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
        ><blog-post-preview
          @posts-changed="getPosts"
          :post="post"
        ></blog-post-preview>
      </router-link>
    </div>
    <router-view v-if="!showPosts" />
    <!-- <new-post v-if="false"></new-post> -->
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import BlogPostPreview from './components/BlogPostPreview';
import Navbar from './components/Navbar';
// import NewPost from './components/NewPost';

export default {
  name: 'App',
  components: { BlogPostPreview, Navbar },
  data: () => ({
    posts: null,
    showPosts: true,
    isLoading: true,
    loginToken: localStorage.getItem('token'),
  }),
  watch: {
    // Change state when user goes back
    $route(to) {
      if (to.path === '/') this.showPosts = true;
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do, YYYY');
    },
    async getPosts() {
      const vm = this;
      let posts;
      // Gets all posts and their author's name
      try {
        let response;
        if (this.loginToken) {
          response = await axios.get(
            'https://disco-blog-api.herokuapp.com/posts/all',
            {
              headers: { Authorization: `Bearer ${this.loginToken}` },
            }
          );
        } else {
          response = await axios.get(
            'https://disco-blog-api.herokuapp.com/posts/'
          );
        }
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
        // So it's reverse chronologically
        this.posts = posts.reverse();
        this.isLoading = false;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  async mounted() {
    const vm = this;
    setTimeout(() => {
      if (!vm.posts)
        this.$buefy.toast.open({
          message: `Starting up Heroku`,
          position: 'is-bottom',
          duration: 3000,
        });
    }, 3500);
    this.getPosts();
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
