import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '../middleware/auth'
import VueRouteMiddleware from 'vue-route-middleware'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Posts.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

router.beforeEach(VueRouteMiddleware())

export default router
