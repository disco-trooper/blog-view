<template>
  <div class="editorDiv mt-5">
    <b-field label="Title" class="has-text-left">
      <b-input v-model="post.title" type="text" :value="post.title"></b-input>
    </b-field>
    <b-field class="has-text-left" label="Text"
      ><editor
        v-model="post.text"
        apiKey="tqqrd42v31nikrsu265p5q122mhmyubtn46o41km5jcmrvj9"
        :initialValue="post.text"
        :init="{
          theme_advanced_resizing_use_cookie: false,
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap',
            'searchreplace visualblocks code fullscreen',
            'print preview anchor insertdatetime media',
            'paste code help wordcount table',
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
    alignleft aligncenter alignright | \
    bullist numlist outdent indent | help',
        }"
      >
      </editor
    ></b-field>
    <div class="buttons">
      <b-button @click="submitPost" type="is-primary is-light">Save</b-button>
      <router-link class="button is-light" tag="button" to="/"
        >Cancel</router-link
      >
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios';

export default {
  components: { Editor },
  data: () => ({
    loginToken: localStorage.getItem('token'),
    post: { title: '', text: '' },
  }),
  methods: {
    async submitPost() {
      try {
        await axios.post(
          'https://disco-blog-api.herokuapp.com/posts/',
          { title: this.post.title, text: this.post.text },
          { headers: { authorization: `Bearer ${this.loginToken}` } }
        );
        this.$router.push('/');
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.editorDiv {
  max-width: 600px;
  margin: 0 auto;
}

.buttons {
  margin-right: auto;

  button {
    display: inline-block;
  }
}
</style>
