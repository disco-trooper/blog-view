import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogPostFull from '../views/BlogPostFull';

Vue.use(VueRouter);

const routes = [
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
