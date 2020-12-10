import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogPostFull from '../views/BlogPostFull';
import NewPost from '../views/NewPost';
import BlogPostThumbnails from '../views/BlogPostThumbnails.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Thumbnails', component: BlogPostThumbnails },
  { path: '/new', name: 'New', component: NewPost },
  {
    path: '/:id',
    name: 'Post',
    props: true,
    component: BlogPostFull,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
