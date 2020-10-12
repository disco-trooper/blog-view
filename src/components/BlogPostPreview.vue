<template>
  <div class="card mx-5 my-5">
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
    </header>
    <div class="card-content">
      <p class="content post-text">
        {{ post.text }}
      </p>
      <p class="content has-text-left subtitle is-7">
        Posted on {{ formatDate(post.timestamp) }} by
        {{ post.authorName }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'BlogPostPreview',
  props: {
    post: { type: Object, required: true, default: null },
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do, YYYY');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
