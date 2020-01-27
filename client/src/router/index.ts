import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import guest from './guest'
import home from './home'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter)

let routes: any = []
const Routes = [guest, home]

Routes.forEach(parent => {
  parent.forEach(child => {
    routes.push(child)
  })
})

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
  store.main.commit('SET_LAYOUT', to.meta.layout)
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
