import axios from 'axios';
import Vue from 'vue';
import * as Config from '../config.json';
import App from './App.vue';
import router from './router';

var axiosInstance = axios.create({
  baseURL: Config.api
  /* other custom settings */
});

Vue.config.productionTip = false
Vue.prototype.$http = axiosInstance
Vue.prototype.router = router;
const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
