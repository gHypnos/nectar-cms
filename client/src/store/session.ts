import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import * as Config from '../../config.json';

Vue.use(Vuex)

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  error: ''
}
const getters = {
  isLoggedIn(state: any) {
    return !!state.token
  },
  authStatus(state: any) {
    return state.status
  }
};
const actions = {
  login: async (commit: any, user: any) => {
    try {
      let result = await axios({ url: Config.api + 'authentication/login', data: user, method: 'POST' })

      let session = {
        status: true,
        token: result.data,
        user: result.data.user
      }

      localStorage.setItem('token', session.token)
      axios.defaults.headers.common['Authorization'] = session.token
      commit.commit("errors", '');
      commit.commit('auth_success', session)
      return Promise.resolve()
    } catch (e) {
      commit.commit("errors", "Invalid credentials");
      return Promise.reject(e)
    }
  },
  logout(commit: any) {
    commit.commit('logout')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
  }
};
const mutations = {
  auth_request(state: any) {
    state.status = 'loading';
  },
  auth_success(state: any, data: any) {
    state.status = 'success';
    state.token = data.token;
    state.user = data.user;
  },
  auth_error(state: any) {
    state.status = 'error';
  },
  logout(state: any) {
    state.status = '';
    state.token = '';
  },
  errors(state: any, value: string) {
    state.error = value
  }
};
const Session = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default Session
