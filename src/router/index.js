import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MissView from '../views/MissView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/miss',
    name: 'miss',
    component: () => MissView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
