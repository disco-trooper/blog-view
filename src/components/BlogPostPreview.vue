<template>
  <div class="card mx-3 my-3">
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
      <div class="media-right mt-3 mr-2" v-if="loginToken">
        <button class="delete" @click.prevent.stop="deletePost(post)"></button>
      </div>
    </header>
    <div class="card-content">
      <p class="content post-text" v-html="post.text"></p>
      <p class="content has-text-left subtitle is-7">
        Posted on {{ formatDate(post.timestamp) }} by
        {{ post.authorName }}
      </p>
    </div>
    <footer v-if="loginToken" class="card-footer">
      <a
        v-if="!post.public"
        @click.prevent.stop="switchVisibility(post)"
        class="card-footer-item"
        >Publish</a
      >
      <a
        @click.prevent.stop="switchVisibility(post)"
        v-else
        class="card-footer-item"
        >Hide</a
      >
    </footer>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'BlogPostPreview',
  props: {
    post: { type: Object, required: true, default: null },
  },
  data: () => ({ loginToken: localStorage.getItem('token') }),
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do, YYYY');
    },
    async deletePost(post) {
      try {
        await axios.delete(
          `https://disco-blog-api.herokuapp.com/posts/${post._id}`,

          { headers: { authorization: `Bearer ${this.loginToken}` } }
        );
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async switchVisibility(post) {
      const vm = this;
      if (post.public) {
        try {
          await axios.put(
            `https://disco-blog-api.herokuapp.com/posts/${post._id}`,
            { public: false },
            { headers: { authorization: `Bearer ${vm.loginToken}` } }
          );
          this.$emit('posts-changed');
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await axios.put(
            `https://disco-blog-api.herokuapp.com/posts/${post._id}`,
            { public: true },
            { headers: { authorization: `Bearer ${vm.loginToken}` } }
          );
          this.$emit('posts-changed');
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
