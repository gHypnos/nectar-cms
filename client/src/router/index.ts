import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import community from './community'
import guest from './guest'
import home from './home'
import middlewarePipeline from './middlewarePipeline'
import settings from './settings'

Vue.use(VueRouter)

let routes: any = []
const Routes = [guest, home, settings, community]

Routes.forEach((parent: any) => {
  parent.forEach((child: any) => {
    routes.push(child)
  })
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.main.commit('setLoading', true)
  store.main.dispatch("loadSettings").then(() => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find((r: { meta: { title: any; }; }) => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find((r: { meta: { metaTags: any; }; }) => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find((r: { meta: { metaTags: any; }; }) => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = store.main.getters.settings.hotel_name + ' - ' + nearestWithTitle.meta.title;
  });
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
router.afterEach((to, from) => {
  setTimeout(() => {
    store.main.commit('setLoading', false)
  }, 500)
})
export default router
