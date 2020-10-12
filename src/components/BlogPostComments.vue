<template>
  <div>
    <div v-for="(comment, index) in comments" :key="index" class="mb-5 comment">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong class="mr-1">{{ comment.author }}</strong>
              <small>on {{ formatDate(comment.timestamp) }}</small>
              <br />
              {{ comment.text }}
            </p>
          </div>
        </div>
        <div class="media-right">
          <button class="delete"></button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'BlogPostComments',
  data: () => ({ comments: null }),
  props: { id: String },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do YYYY, HH:mm');
    },
    async getComments(postID) {
      try {
        const response = await axios.get(
          `https://disco-blog-api.herokuapp.com/posts/${postID}/comments`
        );
        this.comments = response.data.reverse();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    const vm = this;
    this.getComments(this.id);
    this.$root.$on('comment-sent', () => {
      vm.getComments(vm.id);
    });
  },
};
</script>

<style lang="scss">
.comment {
  margin: 0 auto;
  max-width: 600px;
}
</style>
