import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('../views/dashboard/addTask.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import( '../views/auth/Signup.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue')
    }
  ]
})

export default router
