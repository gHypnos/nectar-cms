import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import auth from './middleware/auth'
import guest from './middleware/guest'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Login,
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      middleware: [
        auth
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
