import { createRouter, createWebHistory } from 'vue-router'

import Login from '/src/views/Login.vue'
import Register from '/src/views/Register.vue'
import Verif_Code from '../views/Verif_Code.vue'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
   {
      path: '/login',
      component: Login,
   },
   {
      path: '/verif_code',
      component: Verif_Code,
   },
   {
      path: '/register',
      component: Register,
   },

]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router