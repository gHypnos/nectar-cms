import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import moment from 'moment';
import Vue from 'vue';
import API from './api';
import App from './App.vue';
import { i18n } from './plugins/i18n';
import router from './router';
import store from './store';

Vue.config.productionTip = false
Vue.prototype.$http = API
Vue.prototype.router = router;
Vue.prototype.$store = store;
const token = localStorage.getItem('token');
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.filter('formatDate', function (value: any) {
  if (value) {
    return moment.unix(value).format('MMM Do, YYYY hh:mm A')
  }
});

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
