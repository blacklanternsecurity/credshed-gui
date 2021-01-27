import login from '@/components/login.vue'
import search from '@/components/search.vue'
import querystats from '@/components/querystats.vue'
import sourcestats from '@/components/sourcestats.vue'
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'search',
    component: search
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/source/:id',
    name: 'sourcestats',
    component: sourcestats
  },
  {
    path: '/query/:query',
    name: 'querystats',
    component: querystats
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;