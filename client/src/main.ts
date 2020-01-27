import Vue from 'vue';
import API from './api';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false
Vue.prototype.$http = API
Vue.prototype.router = router;
const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
