import { createRouter, createWebHistory } from 'vue-router'
import Messager from '@/views/MessagerView.vue'
import Login from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/messager',
      name: 'messager',
      component: Messager
    }
  ]
})

export default router
