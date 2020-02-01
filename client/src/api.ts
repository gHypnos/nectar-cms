import Axios from 'axios';
import express from 'express';
import { Config } from '../config';
import store from './store';

const API = Axios.create({
  baseURL: Config.api
})

export default API

API.interceptors.response.use(
  response => handler(response)
)

const handler = (res: express.response) => {
  if (res.data.error) {
    if (res.data.error === 'banned') {
      store.Session.commit('banned', res.data.ban)
      store.Session.dispatch('logout')
    }
  }
  return res
}
