import Axios, { AxiosResponse } from 'axios';
import { Config } from '../config';
import router from './router';
import store from './store';

const API = Axios.create({
  baseURL: Config.api
})

export default API

API.interceptors.response.use(
  response => handler(response)
)

const handler = (res: AxiosResponse) => {
  if (res.data.error) {
    if (res.data.error === 'banned') {
      if (store.Session.getters.isLoggedIn) {
        store.Session.dispatch('logout')
      }
      router.push({ name: 'Login' })
      store.Session.commit('banned', res.data.ban)
    }
  }
  return res
}
