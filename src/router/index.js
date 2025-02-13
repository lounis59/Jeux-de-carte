import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '@/views/PlayView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/play',
    name: 'play',
    component: PlayView
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
