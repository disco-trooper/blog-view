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
        <div class="media-right" v-if="loginToken">
          <button
            class="delete"
            @click="deleteComment(comment._id, id)"
          ></button>
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
  data: () => ({ comments: null, loginToken: localStorage.getItem('token') }),
  props: { id: String },
  methods: {
    formatDate(date) {
      return moment(date).format('MMM Do YYYY, HH:mm');
    },
    async deleteComment(commentID, postID) {
      const vm = this;
      if (this.loginToken) {
        try {
          await axios.delete(
            `https://disco-blog-api.herokuapp.com/posts/${postID}/comments/${commentID}`,
            { headers: { Authorization: `Bearer ${vm.loginToken}` } }
          );
          await vm.getComments(postID);
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    async getComments(postID) {
      try {
        const response = await axios.get(
          `https://disco-blog-api.herokuapp.com/posts/${postID}/comments`
        );
        this.comments = response.data.reverse();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  async mounted() {
    const vm = this;
    try {
      this.getComments(this.id);
      this.$root.$on('comment-sent', () => {
        vm.getComments(vm.id);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
</script>

<style lang="scss">
.comment {
  margin: 0 auto;
  max-width: 600px;
}
</style>
