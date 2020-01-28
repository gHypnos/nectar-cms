import Vue from 'vue';
import Vuex from 'vuex';
import API from '../api';

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
  load: async (context: any) => {
    try {
      await context.commit('loadSession')
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  },
  login: async (commit: any, user: any) => {
    try {
      let result = await API.post('/authentication/login', user);

      let session = {
        status: true,
        token: result.data,
        user: result.data.user
      }

      localStorage.setItem('token', session.token)
      API.defaults.headers.common['Authorization'] = session.token
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
    delete API.defaults.headers.common['Authorization'];
  }
};
const mutations = {
  setUser(state: any, data: any) {
    state.user = data
  },
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
