<template>
  <div class="content mx-auto mt-6">
    <h2>{{ post.title }}</h2>
    <p>{{ post.text }}</p>
    <div class="mt-6">
      <BlogPostNewComment :id="id" class="mb-5" />
      <BlogPostComments :id="id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BlogPostComments from '../components/BlogPostComments';
import BlogPostNewComment from '../components/BlogPostNewComment';

export default {
  props: { id: String },
  data: () => ({
    post: '',
  }),
  async mounted() {
    // GET Post Details
    try {
      const response = await axios.get(
        'https://disco-blog-api.herokuapp.com/posts/' + this.id
      );
      this.post = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  components: { BlogPostComments, BlogPostNewComment },
};
</script>

<style lang="scss">
.content {
  max-width: 800px;
  margin: 0 auto;

  p {
    text-align: left;
  }
}
</style>
