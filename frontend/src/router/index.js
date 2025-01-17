import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Verif_Code from '../views/Verif_Code.vue'
import Visite from '../views/Visite.vue'
import NewVisite from '../views/New-Visite.vue'

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
   {
      path: '/visite',
      component: Visite,
   },
   {
      path: '/new-visite',
      component: NewVisite,
   },

]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router