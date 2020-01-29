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

let nectar = `,---.   .--.    .-''-.      _______ ,---------.    ____    .-------.     \n`;
nectar += "|    \\  |  |  .'_ _   \\    /   __  \\\\          \\ .'  __ `. |  _ _   \\    \n";
nectar += "|  ,  \\ |  | / ( ` )   '  | ,_/  \\__)`--.  ,---'/   '  \\  \\| ( ' )  |    \n";
nectar += "|  |\\_ \\|  |. (_ o _)  |,-./  )         |   \\   |___|  /  ||(_ o _) /    \n";
nectar += "|  _( )_\\  ||  (_,_)___|\\  '_ '`)       :_ _:      _.-`   || (_,_).' __  \n";
nectar += "| (_ o _)  |'  \\   .---. > (_)  )  __   (_I_)   .'   _    ||  |\\ \\  |  | \n";
nectar += "|  (_,_)\\  | \\  `-'    /(  .  .-'_/  ) (_(=)_)  |  _( )_  ||  | \\ `'   / \n";
nectar += "|  |    |  |  \\       /  `-'`-'     /   (_I_)   \\ (_ o _) /|  |  \\    /  \n";
nectar += "'--'    '--'   `'-..-'     `._____.'    '---'    '.(_,_).' ''-'   `'-'   ";

setTimeout(console.log.bind(console, nectar));
