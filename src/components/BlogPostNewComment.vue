<template>
  <form @submit.prevent="onSubmit(id)" class="has-text-left">
    <h4 class="has-text-centered">New Comment</h4>
    <b-field label="Name">
      <b-input v-model="author" type="text"></b-input>
    </b-field>
    <b-field label="Text">
      <textarea v-model="text" class="textarea"></textarea>
    </b-field>
    <b-button
      type="is-primary is-outlined"
      tag="input"
      native-type="submit"
      value="Submit"
    />
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BlogPostNewComment',
  props: { id: String },
  data: () => ({ author: '', text: '' }),
  methods: {
    async onSubmit(id) {
      try {
        await axios.post(
          `https://disco-blog-api.herokuapp.com/posts/${id}/comments`,
          {
            author: this.author,
            text: this.text,
          }
        );
        this.$root.$emit('comment-sent');
        this.author = '';
        this.text = '';
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
