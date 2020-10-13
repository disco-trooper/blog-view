<template>
  <div class="content mx-auto mt-6">
    <div v-if="!editingPost">
      <h2>{{ post.title }}</h2>
      <p v-html="post.text"></p>
    </div>
    <div v-else>
      <b-input v-model="post.title" type="text" :value="post.title"></b-input>
      <editor
        v-model="post.text"
        apiKey="tqqrd42v31nikrsu265p5q122mhmyubtn46o41km5jcmrvj9"
        :initialValue="post.text"
        :init="{
          theme_advanced_resizing_use_cookie: false,
          height: 500,
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
      </editor>
    </div>
    <div id="buttons" class="is-flex justify-start mt-2">
      <b-button
        v-if="!editingPost"
        class="button mr-3"
        @click="editingPost = true"
        >Edit</b-button
      >
      <div v-else>
        <b-button
          class="button mr-3"
          @click="
            editingPost = false;
            savePost(post._id);
          "
          >Save</b-button
        >
        <b-button
          class="button mr-3"
          @click="
            editingPost = false;
            post.text = uneditedPost.text;
            post.title = uneditedPost.title;
          "
          >Cancel</b-button
        >
      </div>
      <b-button
        v-if="!editingPost"
        class="button"
        @click="addingComment = true"
      >
        Add Comment
      </b-button>
    </div>
    <div class="mt-6">
      <BlogPostNewComment
        v-if="addingComment"
        :id="id"
        class="mb-5"
        @comments-closed="addingComment = false"
      />
      <BlogPostComments :id="id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BlogPostComments from '../components/BlogPostComments';
import BlogPostNewComment from '../components/BlogPostNewComment';
import Editor from '@tinymce/tinymce-vue';

export default {
  props: { id: String },
  data: () => ({
    post: '',
    addingComment: false,
    editingPost: false,
    uneditedPost: { text: '', title: '' },
    loginToken: localStorage.getItem('token'),
  }),
  methods: {
    async savePost(postID) {
      try {
        await axios.put(
          `https://disco-blog-api.herokuapp.com/posts/${postID}`,
          { text: this.post.text, title: this.post.title },
          { headers: { Authorization: `Bearer ${this.loginToken}` } }
        );
        this.uneditedPost.text = this.post.text;
        this.uneditedPost.title = this.post.title;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  async mounted() {
    // GET Post Details
    try {
      const response = await axios.get(
        'https://disco-blog-api.herokuapp.com/posts/' + this.id
      );
      this.post = response.data;
      this.uneditedPost.text = this.post.text;
      this.uneditedPost.title = this.post.title;
    } catch (error) {
      throw new Error(error);
    }
  },
  components: { BlogPostComments, BlogPostNewComment, Editor },
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

#buttons {
  margin-right: auto;
}
</style>
